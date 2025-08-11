import os
import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import cv2
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
from pathlib import Path

class LabubuClassifier:
    def __init__(self, data_dir='./training-data'):
        self.data_dir = Path(data_dir)
        self.images_dir = self.data_dir / 'images'
        self.metadata_file = self.data_dir / 'metadata.json'
        self.model = None
        self.class_names = ['authentic', 'fake']
        
    def load_dataset(self):
        """Load and preprocess the training dataset"""
        print("📂 Loading dataset...")
        
        # Load metadata
        with open(self.metadata_file, 'r') as f:
            metadata = json.load(f)
        
        images = []
        labels = []
        features = []
        
        for item in metadata:
            img_path = self.images_dir / item['authenticity'] / item['filename']
            
            if img_path.exists():
                # Load and preprocess image
                img = cv2.imread(str(img_path))
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = cv2.resize(img, (224, 224))
                img = img.astype(np.float32) / 255.0
                
                images.append(img)
                labels.append(1 if item['authenticity'] == 'authentic' else 0)
                
                # Extract manual features for ensemble learning
                feature_vector = [
                    item['features']['paintQuality'] / 100,
                    item['features']['sculptDetails'] / 100,
                    item['features']['packagingAuth'] / 100,
                    item['features']['materialTexture'] / 100,
                    1 if item['metadata']['quality'] == 'high' else 0.5,
                    1 if item['metadata']['lighting'] == 'natural' else 0.5,
                    1 if item['metadata']['background'] == 'clean' else 0.5
                ]
                features.append(feature_vector)
        
        print(f"✅ Loaded {len(images)} images")
        return np.array(images), np.array(labels), np.array(features)
    
    def create_model(self):
        """Create a multi-input CNN model"""
        print("🏗️ Creating model architecture...")
        
        # Image input branch
        image_input = keras.Input(shape=(224, 224, 3), name='image')
        
        # Use pre-trained EfficientNetB0 as backbone
        backbone = keras.applications.EfficientNetB0(
            weights='imagenet',
            include_top=False,
            input_tensor=image_input
        )
        
        # Freeze early layers, fine-tune later ones
        for layer in backbone.layers[:-20]:
            layer.trainable = False
        
        x = backbone.output
        x = layers.GlobalAveragePooling2D()(x)
        x = layers.Dropout(0.3)(x)
        image_features = layers.Dense(128, activation='relu', name='image_features')(x)
        
        # Manual features input branch
        feature_input = keras.Input(shape=(7,), name='features')
        feature_dense = layers.Dense(32, activation='relu')(feature_input)
        feature_dense = layers.Dropout(0.2)(feature_dense)
        
        # Combine both branches
        combined = layers.concatenate([image_features, feature_dense])
        combined = layers.Dense(64, activation='relu')(combined)
        combined = layers.Dropout(0.3)(combined)
        
        # Output layers
        authenticity_output = layers.Dense(1, activation='sigmoid', name='authenticity')(combined)
        confidence_output = layers.Dense(1, activation='sigmoid', name='confidence')(combined)
        
        self.model = keras.Model(
            inputs=[image_input, feature_input],
            outputs=[authenticity_output, confidence_output]
        )
        
        # Compile with custom loss
        self.model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001),
            loss={
                'authenticity': 'binary_crossentropy',
                'confidence': 'mse'
            },
            loss_weights={'authenticity': 1.0, 'confidence': 0.3},
            metrics={
                'authenticity': ['accuracy', 'precision', 'recall'],
                'confidence': ['mae']
            }
        )
        
        print("✅ Model created")
        return self.model
    
    def train(self, epochs=50, batch_size=32):
        """Train the model"""
        print("🚀 Starting training...")
        
        # Load data
        images, labels, features = self.load_dataset()
        
        if len(images) == 0:
            print("❌ No training data found!")
            return
        
        # Create confidence labels (higher for clear authentic/fake cases)
        confidence_labels = np.abs(labels - 0.5) * 2  # Convert to 0-1 confidence
        
        # Split data
        X_img_train, X_img_val, X_feat_train, X_feat_val, y_auth_train, y_auth_val, y_conf_train, y_conf_val = train_test_split(
            images, features, labels, confidence_labels, test_size=0.2, random_state=42, stratify=labels
        )
        
        print(f"📊 Training set: {len(X_img_train)} samples")
        print(f"📊 Validation set: {len(X_img_val)} samples")
        
        # Data augmentation
        datagen = keras.preprocessing.image.ImageDataGenerator(
            rotation_range=10,
            width_shift_range=0.1,
            height_shift_range=0.1,
            zoom_range=0.1,
            horizontal_flip=True,
            brightness_range=[0.9, 1.1]
        )
        
        # Callbacks
        callbacks = [
            keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True),
            keras.callbacks.ReduceLROnPlateau(factor=0.5, patience=5),
            keras.callbacks.ModelCheckpoint(
                'models/labubu_classifier_best.h5',
                save_best_only=True,
                monitor='val_authenticity_accuracy'
            )
        ]
        
        # Create model if not exists
        if self.model is None:
            self.create_model()
        
        # Train
        history = self.model.fit(
            [X_img_train, X_feat_train],
            {'authenticity': y_auth_train, 'confidence': y_conf_train},
            validation_data=(
                [X_img_val, X_feat_val],
                {'authenticity': y_auth_val, 'confidence': y_conf_val}
            ),
            epochs=epochs,
            batch_size=batch_size,
            callbacks=callbacks,
            verbose=1
        )
        
        # Evaluate
        self.evaluate_model(X_img_val, X_feat_val, y_auth_val)
        
        # Plot training history
        self.plot_training_history(history)
        
        print("✅ Training completed!")
        return history
    
    def evaluate_model(self, X_img_val, X_feat_val, y_auth_val):
        """Evaluate model performance"""
        print("📊 Evaluating model...")
        
        predictions = self.model.predict([X_img_val, X_feat_val])
        auth_pred = (predictions[0] > 0.5).astype(int).flatten()
        
        print("\n📈 Classification Report:")
        print(classification_report(y_auth_val, auth_pred, target_names=self.class_names))
        
        print("\n🔍 Confusion Matrix:")
        cm = confusion_matrix(y_auth_val, auth_pred)
        print(cm)
        
        # Calculate accuracy by series (if metadata available)
        accuracy = np.mean(auth_pred == y_auth_val)
        print(f"\n🎯 Overall Accuracy: {accuracy:.3f}")
    
    def plot_training_history(self, history):
        """Plot training metrics"""
        fig, axes = plt.subplots(2, 2, figsize=(12, 10))
        
        # Authenticity accuracy
        axes[0, 0].plot(history.history['authenticity_accuracy'], label='Train')
        axes[0, 0].plot(history.history['val_authenticity_accuracy'], label='Val')
        axes[0, 0].set_title('Authenticity Accuracy')
        axes[0, 0].legend()
        
        # Authenticity loss
        axes[0, 1].plot(history.history['authenticity_loss'], label='Train')
        axes[0, 1].plot(history.history['val_authenticity_loss'], label='Val')
        axes[0, 1].set_title('Authenticity Loss')
        axes[0, 1].legend()
        
        # Confidence MAE
        axes[1, 0].plot(history.history['confidence_mae'], label='Train')
        axes[1, 0].plot(history.history['val_confidence_mae'], label='Val')
        axes[1, 0].set_title('Confidence MAE')
        axes[1, 0].legend()
        
        # Total loss
        axes[1, 1].plot(history.history['loss'], label='Train')
        axes[1, 1].plot(history.history['val_loss'], label='Val')
        axes[1, 1].set_title('Total Loss')
        axes[1, 1].legend()
        
        plt.tight_layout()
        plt.savefig('training_history.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        print("📊 Training plots saved as 'training_history.png'")

def main():
    """Main training function"""
    # Create models directory
    os.makedirs('models', exist_ok=True)
    
    # Initialize and train classifier
    classifier = LabubuClassifier()
    
    # Check if training data exists
    if not classifier.metadata_file.exists():
        print("❌ No training data found!")
        print("Please run the data collection script first.")
        return
    
    # Train the model
    classifier.train(epochs=100, batch_size=16)
    
    # Save final model
    classifier.model.save('models/labubu_classifier_final.h5')
    print("💾 Model saved to 'models/labubu_classifier_final.h5'")

if __name__ == "__main__":
    main()
