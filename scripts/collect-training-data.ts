import fs from "fs/promises"
import path from "path"
import sharp from "sharp"

interface TrainingImage {
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
  annotations?: {
    boundingBoxes: Array<{
      label: string
      x: number
      y: number
      width: number
      height: number
    }>
  }
}

class TrainingDataCollector {
  private dataDir = "./training-data"
  private imagesDir = path.join(this.dataDir, "images")
  private metadataFile = path.join(this.dataDir, "metadata.json")

  async initialize() {
    await fs.mkdir(this.dataDir, { recursive: true })
    await fs.mkdir(this.imagesDir, { recursive: true })
    await fs.mkdir(path.join(this.imagesDir, "authentic"), { recursive: true })
    await fs.mkdir(path.join(this.imagesDir, "fake"), { recursive: true })

    console.log("✅ Training data directories created")
  }

  async processImage(imagePath: string, metadata: Omit<TrainingImage, "id" | "filename">): Promise<TrainingImage> {
    const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const filename = `${id}.jpg`
    const outputPath = path.join(this.imagesDir, metadata.authenticity, filename)

    // Process and standardize image
    await sharp(imagePath)
      .resize(512, 512, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath)

    const trainingImage: TrainingImage = {
      id,
      filename,
      ...metadata,
    }

    await this.saveMetadata(trainingImage)
    console.log(`✅ Processed: ${filename}`)

    return trainingImage
  }

  async saveMetadata(image: TrainingImage) {
    let metadata: TrainingImage[] = []

    try {
      const data = await fs.readFile(this.metadataFile, "utf-8")
      metadata = JSON.parse(data)
    } catch (error) {
      // File doesn't exist yet
    }

    metadata.push(image)
    await fs.writeFile(this.metadataFile, JSON.stringify(metadata, null, 2))
  }

  async getDatasetStats() {
    try {
      const data = await fs.readFile(this.metadataFile, "utf-8")
      const metadata: TrainingImage[] = JSON.parse(data)

      const stats = {
        total: metadata.length,
        authentic: metadata.filter((img) => img.authenticity === "authentic").length,
        fake: metadata.filter((img) => img.authenticity === "fake").length,
        bySeries: {} as Record<string, number>,
        byAngle: {} as Record<string, number>,
      }

      metadata.forEach((img) => {
        stats.bySeries[img.series] = (stats.bySeries[img.series] || 0) + 1
        stats.byAngle[img.metadata.angle] = (stats.byAngle[img.metadata.angle] || 0) + 1
      })

      return stats
    } catch (error) {
      return { total: 0, authentic: 0, fake: 0, bySeries: {}, byAngle: {} }
    }
  }
}

// Example usage
async function collectSampleData() {
  const collector = new TrainingDataCollector()
  await collector.initialize()

  // Example of processing sample images
  const sampleImages = [
    {
      path: "./sample-data/authentic-series1-front.jpg",
      metadata: {
        series: "Series 1",
        variant: "Original Pink",
        authenticity: "authentic" as const,
        source: "official_store",
        metadata: {
          angle: "front" as const,
          quality: "high" as const,
          lighting: "natural" as const,
          background: "clean" as const,
        },
        features: {
          paintQuality: 95,
          sculptDetails: 92,
          packagingAuth: 98,
          materialTexture: 94,
        },
      },
    },
    // Add more sample images...
  ]

  for (const sample of sampleImages) {
    try {
      await collector.processImage(sample.path, sample.metadata)
    } catch (error) {
      console.log(`⚠️ Could not process ${sample.path}: ${error}`)
    }
  }

  const stats = await collector.getDatasetStats()
  console.log("📊 Dataset Statistics:", stats)
}

// Run if called directly
if (require.main === module) {
  collectSampleData().catch(console.error)
}

export { TrainingDataCollector, type TrainingImage }
