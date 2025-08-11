import os
import json
import numpy as np
from pathlib import Path
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib

class SimpleLabubuClassifier:
    def __init__(self, data_dir='./training-data'):
        self.data_dir = Path(data_dir)
        self.metadata_file = self.data_dir / 'metadata.json'
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        
    def load_dataset(self):
        """Load the training dataset from metadata"""
        print("📂 Loading dataset...")
        
        if not self.metadata_file.exists():
            print("❌ No metadata.json found!")
            print("\n🔧 To fix this, run one of these commands:")
            print("   npm run generate-sample-data")
            print("   OR")
            print("   node -r tsx/cjs scripts/generate-sample-training-data.ts")
            print("   OR")
            print("   npx tsx scripts/generate-sample-training-data.ts")
            return None, None
        
        with open(self.metadata_file, 'r') as f:
            metadata = json.load(f)
        
        if len(metadata) == 0:
            print("❌ No training data found in metadata!")
            print("The metadata.json file exists but is empty.")
            print("Please run the data generation script first.")
            return None, None
        
        print(f"📊 Found {len(metadata)} training samples")
        
        # Extract features and labels
        features = []
        labels = []
        
        for item in metadata:
            # Create feature vector from metadata
            feature_vector = [
                item['features']['paintQuality'] / 100,
                item['features']['sculptDetails'] / 100,
                item['features']['packagingAuth'] / 100,
                item['features']['materialTexture'] / 100,
                1 if item['metadata']['quality'] == 'high' else 0.5,
                1 if item['metadata']['lighting'] == 'natural' else 0.5,
                1 if item['metadata']['background'] == 'clean' else 0.5,
                1 if item['metadata']['angle'] == 'front' else 0.5,
                len(item['series']),  # Series complexity
                len(item['variant']),  # Variant name length
            ]
            
            features.append(feature_vector)
            labels.append(1 if item['authenticity'] == 'authentic' else 0)
        
        features = np.array(features)
        labels = np.array(labels)
        
        print(f"✅ Loaded {len(features)} samples with {features.shape[1]} features")
        print(f"📊 Authentic: {np.sum(labels)} | Counterfeit: {len(labels) - np.sum(labels)}")
        
        return features, labels
    
    def train(self):
        """Train the classifier"""
        print("🚀 Starting training...")
        
        # Load data
        X, y = self.load_dataset()
        
        if X is None or len(X) == 0:
            print("❌ No training data available!")
            return None
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"📊 Training set: {len(X_train)} samples")
        print(f"📊 Test set: {len(X_test)} samples")
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train Random Forest classifier
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            class_weight='balanced'
        )
        
        print("🌳 Training Random Forest classifier...")
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluate
        train_pred = self.model.predict(X_train_scaled)
        test_pred = self.model.predict(X_test_scaled)
        
        train_accuracy = accuracy_score(y_train, train_pred)
        test_accuracy = accuracy_score(y_test, test_pred)
        
        print(f"\n📈 Training Accuracy: {train_accuracy:.3f}")
        print(f"📈 Test Accuracy: {test_accuracy:.3f}")
        
        # Detailed evaluation
        print("\n📊 Test Set Classification Report:")
        print(classification_report(y_test, test_pred, target_names=['Counterfeit', 'Authentic']))
        
        print("\n🔍 Confusion Matrix:")
        cm = confusion_matrix(y_test, test_pred)
        print(cm)
        
        # Feature importance
        feature_names = [
            'Paint Quality', 'Sculpt Details', 'Packaging Auth', 'Material Texture',
            'High Quality', 'Natural Lighting', 'Clean Background', 'Front Angle',
            'Series Complexity', 'Variant Name Length'
        ]
        
        importances = self.model.feature_importances_
        feature_importance = list(zip(feature_names, importances))
        feature_importance.sort(key=lambda x: x[1], reverse=True)
        
        print("\n🎯 Feature Importance:")
        for feature, importance in feature_importance:
            print(f"  {feature}: {importance:.3f}")
        
        # Save model
        self.save_model()
        
        # Plot results
        self.plot_results(feature_importance, cm)
        
        return {
            'train_accuracy': train_accuracy,
            'test_accuracy': test_accuracy,
            'feature_importance': feature_importance
        }
    
    def save_model(self):
        """Save the trained model"""
        os.makedirs('models', exist_ok=True)
        
        joblib.dump(self.model, 'models/labubu_classifier.pkl')
        joblib.dump(self.scaler, 'models/labubu_scaler.pkl')
        
        print("💾 Model saved to 'models/labubu_classifier.pkl'")
        print("💾 Scaler saved to 'models/labubu_scaler.pkl'")
    
    def load_model(self):
        """Load a saved model"""
        try:
            self.model = joblib.load('models/labubu_classifier.pkl')
            self.scaler = joblib.load('models/labubu_scaler.pkl')
            print("✅ Model loaded successfully")
            return True
        except FileNotFoundError:
            print("❌ No saved model found")
            return False
    
    def predict(self, features):
        """Make predictions on new data"""
        if self.model is None:
            if not self.load_model():
                print("❌ No model available for prediction")
                return None
        
        features_scaled = self.scaler.transform([features])
        prediction = self.model.predict(features_scaled)[0]
        probability = self.model.predict_proba(features_scaled)[0]
        
        return {
            'prediction': 'authentic' if prediction == 1 else 'fake',
            'confidence': max(probability),
            'probabilities': {
                'fake': probability[0],
                'authentic': probability[1]
            }
        }
    
    def plot_results(self, feature_importance, confusion_matrix):
        """Plot training results"""
        try:
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
            
            # Feature importance plot
            features, importances = zip(*feature_importance)
            ax1.barh(range(len(features)), importances)
            ax1.set_yticks(range(len(features)))
            ax1.set_yticklabels(features)
            ax1.set_xlabel('Importance')
            ax1.set_title('Feature Importance')
            ax1.grid(axis='x', alpha=0.3)
            
            # Confusion matrix plot
            im = ax2.imshow(confusion_matrix, interpolation='nearest', cmap=plt.cm.Blues)
            ax2.figure.colorbar(im, ax=ax2)
            ax2.set(xticks=np.arange(confusion_matrix.shape[1]),
                    yticks=np.arange(confusion_matrix.shape[0]),
                    xticklabels=['Counterfeit', 'Authentic'],
                    yticklabels=['Counterfeit', 'Authentic'],
                    title='Confusion Matrix',
                    ylabel='True label',
                    xlabel='Predicted label')
            
            # Add text annotations to confusion matrix
            thresh = confusion_matrix.max() / 2.
            for i in range(confusion_matrix.shape[0]):
                for j in range(confusion_matrix.shape[1]):
                    ax2.text(j, i, format(confusion_matrix[i, j], 'd'),
                            ha="center", va="center",
                            color="white" if confusion_matrix[i, j] > thresh else "black")
            
            plt.tight_layout()
            plt.savefig('training_results.png', dpi=300, bbox_inches='tight')
            plt.show()
            
            print("📊 Results plots saved as 'training_results.png'")
        except Exception as e:
            print(f"⚠️ Could not generate plots: {e}")
            print("This is normal if you don't have matplotlib display configured")

def main():
    """Main training function"""
    print("🎯 Simple Labubu Classifier Training")
    print("=" * 50)
    
    classifier = SimpleLabubuClassifier()
    
    # Check if training data exists
    if not classifier.metadata_file.exists():
        print("❌ No training data found!")
        print("\n🔧 Please run the data generation script first:")
        print("   npm run generate-sample-data")
        print("\n📁 This will create:")
        print("   - ./training-data/ directory")
        print("   - ./training-data/metadata.json file")
        print("   - Sample training images")
        return
    
    # Train the model
    results = classifier.train()
    
    if results:
        print(f"\n🎉 Training completed successfully!")
        print(f"📊 Final test accuracy: {results['test_accuracy']:.1%}")
        
        # Test with sample data
        print("\n🧪 Testing with sample predictions...")
        
        # Test authentic sample
        authentic_features = [0.95, 0.92, 0.98, 0.94, 1.0, 1.0, 1.0, 1.0, 8, 12]
        result = classifier.predict(authentic_features)
        print(f"Authentic sample: {result['prediction']} (confidence: {result['confidence']:.2f})")
        
        # Test fake sample
        fake_features = [0.45, 0.38, 0.25, 0.42, 0.5, 0.5, 0.5, 1.0, 8, 12]
        result = classifier.predict(fake_features)
        print(f"Fake sample: {result['prediction']} (confidence: {result['confidence']:.2f})")
        
        print(f"\n✅ Model ready for use!")
        print(f"📁 Saved to: models/labubu_classifier.pkl")
        
    else:
        print("❌ Training failed!")

if __name__ == "__main__":
    main()
