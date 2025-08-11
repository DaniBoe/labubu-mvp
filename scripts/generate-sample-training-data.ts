import fs from "fs/promises"
import path from "path"

interface SampleImageData {
  series: string
  variant: string
  authenticity: "authentic" | "fake"
  angle: "front" | "back" | "side" | "detail" | "packaging"
  features: {
    paintQuality: number
    sculptDetails: number
    packagingAuth: number
    materialTexture: number
  }
  description: string
}

interface TrainingDataItem {
  id: string
  filename: string
  series: string
  variant: string
  authenticity: "authentic" | "fake"
  source: string
  metadata: {
    angle: "front" | "back" | "side" | "detail" | "packaging"
    quality: "high" | "medium" | "low"
    lighting: "natural" | "artificial" | "mixed"
    background: "clean" | "cluttered" | "neutral"
  }
  features: {
    paintQuality: number
    sculptDetails: number
    packagingAuth: number
    materialTexture: number
  }
  status: "pending" | "approved" | "rejected"
  uploadedAt: string
}

const sampleData: SampleImageData[] = [
  // Series 1 - Authentic
  {
    series: "Series 1",
    variant: "Original Pink",
    authenticity: "authentic",
    angle: "front",
    features: { paintQuality: 95, sculptDetails: 92, packagingAuth: 98, materialTexture: 94 },
    description: "Official Series 1 Original Pink variant with clean paint edges and proper ear proportions",
  },
  {
    series: "Series 1",
    variant: "Blue Variant",
    authenticity: "authentic",
    angle: "front",
    features: { paintQuality: 93, sculptDetails: 90, packagingAuth: 96, materialTexture: 92 },
    description: "Authentic Series 1 Blue variant showing correct sculpt details and material texture",
  },
  {
    series: "Series 1",
    variant: "Original Pink",
    authenticity: "authentic",
    angle: "packaging",
    features: { paintQuality: 95, sculptDetails: 92, packagingAuth: 99, materialTexture: 94 },
    description: "Official packaging with correct typography, holographic elements, and registration marks",
  },

  // Series 1 - Counterfeit
  {
    series: "Series 1",
    variant: "Original Pink",
    authenticity: "fake",
    angle: "front",
    features: { paintQuality: 45, sculptDetails: 38, packagingAuth: 25, materialTexture: 42 },
    description: "Counterfeit with poor paint quality, incorrect ear shape, and glossy plastic texture",
  },
  {
    series: "Series 1",
    variant: "Blue Variant",
    authenticity: "fake",
    angle: "front",
    features: { paintQuality: 52, sculptDetails: 41, packagingAuth: 30, materialTexture: 48 },
    description: "Fake blue variant with uneven paint application and wrong facial proportions",
  },

  // Series 2 - Authentic
  {
    series: "Series 2",
    variant: "Forest Green",
    authenticity: "authentic",
    angle: "front",
    features: { paintQuality: 96, sculptDetails: 94, packagingAuth: 97, materialTexture: 95 },
    description: "Authentic Series 2 Forest Green with excellent paint quality and proper accessories",
  },
  {
    series: "Series 2",
    variant: "Autumn Orange",
    authenticity: "authentic",
    angle: "side",
    features: { paintQuality: 94, sculptDetails: 91, packagingAuth: 95, materialTexture: 93 },
    description: "Side view showing correct ear attachment and body proportions",
  },

  // Series 2 - Counterfeit
  {
    series: "Series 2",
    variant: "Forest Green",
    authenticity: "fake",
    angle: "front",
    features: { paintQuality: 38, sculptDetails: 35, packagingAuth: 20, materialTexture: 40 },
    description: "Poor quality counterfeit with visible paint bleeding and incorrect green shade",
  },

  // Series 3 - Authentic
  {
    series: "Series 3",
    variant: "Space Blue",
    authenticity: "authentic",
    angle: "front",
    features: { paintQuality: 97, sculptDetails: 95, packagingAuth: 99, materialTexture: 96 },
    description: "Premium Series 3 Space Blue with metallic finish and space accessories",
  },
  {
    series: "Series 3",
    variant: "Cosmic Purple",
    authenticity: "authentic",
    angle: "detail",
    features: { paintQuality: 96, sculptDetails: 94, packagingAuth: 98, materialTexture: 95 },
    description: "Close-up detail showing high-quality paint application and fine sculpt work",
  },

  // Series 3 - Counterfeit
  {
    series: "Series 3",
    variant: "Space Blue",
    authenticity: "fake",
    angle: "front",
    features: { paintQuality: 42, sculptDetails: 39, packagingAuth: 28, materialTexture: 44 },
    description: "Fake space variant missing metallic finish and using wrong blue shade",
  },

  // Series 4 - Authentic
  {
    series: "Series 4",
    variant: "Fairy Pink",
    authenticity: "authentic",
    angle: "front",
    features: { paintQuality: 95, sculptDetails: 93, packagingAuth: 97, materialTexture: 94 },
    description: "Authentic fairy variant with delicate wing details and proper translucent elements",
  },

  // Series 4 - Counterfeit
  {
    series: "Series 4",
    variant: "Fairy Pink",
    authenticity: "fake",
    angle: "front",
    features: { paintQuality: 48, sculptDetails: 44, packagingAuth: 32, materialTexture: 46 },
    description: "Counterfeit fairy variant with opaque wings and poor detail work",
  },

  // Series 5 - Authentic
  {
    series: "Series 5",
    variant: "Ocean Teal",
    authenticity: "authentic",
    angle: "front",
    features: { paintQuality: 94, sculptDetails: 92, packagingAuth: 96, materialTexture: 93 },
    description: "Series 5 ocean variant with gradient paint effects and sea-themed accessories",
  },

  // Series 6 - Authentic (Latest)
  {
    series: "Series 6",
    variant: "Monster Purple",
    authenticity: "authentic",
    angle: "front",
    features: { paintQuality: 98, sculptDetails: 96, packagingAuth: 99, materialTexture: 97 },
    description: "Latest Series 6 monster variant with premium paint quality and detailed sculpting",
  },
  {
    series: "Series 6",
    variant: "Monster Green",
    authenticity: "authentic",
    angle: "packaging",
    features: { paintQuality: 98, sculptDetails: 96, packagingAuth: 100, materialTexture: 97 },
    description: "Series 6 packaging showing new holographic security features and updated typography",
  },

  // Series 6 - Counterfeit
  {
    series: "Series 6",
    variant: "Monster Purple",
    authenticity: "fake",
    angle: "front",
    features: { paintQuality: 35, sculptDetails: 32, packagingAuth: 18, materialTexture: 38 },
    description: "Recent counterfeit attempting to copy Series 6 but with obvious quality issues",
  },

  // Additional samples for better training
  {
    series: "Series 1",
    variant: "Yellow Special",
    authenticity: "authentic",
    angle: "side",
    features: { paintQuality: 94, sculptDetails: 91, packagingAuth: 97, materialTexture: 93 },
    description: "Rare yellow variant with special edition packaging",
  },
]

async function generateSampleTrainingData() {
  console.log("🚀 Generating sample training data...")

  // Create training data directory
  const trainingDir = "./training-data"
  await fs.mkdir(trainingDir, { recursive: true })

  // Convert sample data to training format
  const trainingData: TrainingDataItem[] = []

  let processedCount = 0

  for (const sample of sampleData) {
    try {
      const filename = `${sample.series.toLowerCase().replace(/\s+/g, "_")}_${sample.variant.toLowerCase().replace(/\s+/g, "_")}_${sample.authenticity}_${sample.angle}.jpg`

      const trainingItem: TrainingDataItem = {
        id: `sample_${Date.now()}_${processedCount}`,
        filename: filename,
        series: sample.series,
        variant: sample.variant,
        authenticity: sample.authenticity,
        source: "sample_data_generator",
        metadata: {
          angle: sample.angle,
          quality: "high",
          lighting: "natural",
          background: "clean",
        },
        features: sample.features,
        status: "approved",
        uploadedAt: new Date().toISOString(),
      }

      trainingData.push(trainingItem)
      processedCount++
      console.log(`✅ Processed ${processedCount}/${sampleData.length}: ${filename}`)
    } catch (error) {
      console.error(`❌ Error processing sample:`, error)
    }
  }

  // Save metadata to JSON file
  const metadataPath = path.join(trainingDir, "metadata.json")
  await fs.writeFile(metadataPath, JSON.stringify(trainingData, null, 2))

  // Generate statistics
  const stats = {
    total: trainingData.length,
    authentic: trainingData.filter((item) => item.authenticity === "authentic").length,
    fake: trainingData.filter((item) => item.authenticity === "fake").length,
    bySeries: {} as Record<string, number>,
    byAngle: {} as Record<string, number>,
  }

  // Calculate series and angle statistics
  trainingData.forEach((item) => {
    stats.bySeries[item.series] = (stats.bySeries[item.series] || 0) + 1
    stats.byAngle[item.metadata.angle] = (stats.byAngle[item.metadata.angle] || 0) + 1
  })

  console.log("\n📊 Final Dataset Statistics:")
  console.log(`Total Images: ${stats.total}`)
  console.log(`Authentic: ${stats.authentic}`)
  console.log(`Counterfeit: ${stats.fake}`)
  console.log("\nBy Series:")
  Object.entries(stats.bySeries).forEach(([series, count]) => {
    console.log(`  ${series}: ${count}`)
  })
  console.log("\nBy Angle:")
  Object.entries(stats.byAngle).forEach(([angle, count]) => {
    console.log(`  ${angle}: ${count}`)
  })

  console.log("\n🎉 Sample training data generation complete!")
  console.log(`📁 Data saved to: ${trainingDir}/`)
  console.log(`📋 Metadata saved to: ${metadataPath}`)
  console.log("\n🚀 You can now run the training script:")
  console.log("python scripts/train-simple-classifier.py")

  return stats
}

// Run if called directly
if (require.main === module) {
  generateSampleTrainingData().catch(console.error)
}

export { generateSampleTrainingData, sampleData }
