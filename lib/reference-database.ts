import { createClient } from "@supabase/supabase-js"

interface ReferenceImage {
  id: string
  series: string
  variant: string
  angle: string
  imageUrl: string
  features: {
    paintQuality: number
    sculptDetails: number
    packagingAuth: number
    materialTexture: number
  }
  embedding?: number[]
  verified: boolean
  verifiedBy: string
  createdAt: string
}

interface SeriesInfo {
  id: string
  name: string
  releaseDate: string
  totalVariants: number
  commonFeatures: {
    earShape: string
    eyeStyle: string
    bodyTexture: string
    accessories: string[]
  }
  knownCounterfeits: {
    commonIssues: string[]
    telltaleSignsImages: string[]
  }
}

export class ReferenceDatabase {
  private supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

  async addReferenceImage(image: Omit<ReferenceImage, "id" | "createdAt">): Promise<string> {
    const { data, error } = await this.supabase
      .from("reference_images")
      .insert({
        ...image,
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single()

    if (error) throw error
    return data.id
  }

  async getReferenceImages(series?: string, variant?: string): Promise<ReferenceImage[]> {
    let query = this.supabase.from("reference_images").select("*").eq("verified", true)

    if (series) query = query.eq("series", series)
    if (variant) query = query.eq("variant", variant)

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async findSimilarImages(embedding: number[], threshold = 0.8): Promise<ReferenceImage[]> {
    // Using pgvector for similarity search
    const { data, error } = await this.supabase.rpc("find_similar_images", {
      query_embedding: embedding,
      similarity_threshold: threshold,
      match_count: 10,
    })

    if (error) throw error
    return data || []
  }

  async addSeriesInfo(series: Omit<SeriesInfo, "id">): Promise<string> {
    const { data, error } = await this.supabase.from("series_info").insert(series).select("id").single()

    if (error) throw error
    return data.id
  }

  async getSeriesInfo(seriesName: string): Promise<SeriesInfo | null> {
    const { data, error } = await this.supabase.from("series_info").select("*").eq("name", seriesName).single()

    if (error) return null
    return data
  }

  async getAuthenticityMarkers(series: string): Promise<{
    authentic: string[]
    counterfeit: string[]
  }> {
    const seriesInfo = await this.getSeriesInfo(series)

    if (!seriesInfo) {
      return { authentic: [], counterfeit: [] }
    }

    return {
      authentic: [
        `Correct ${seriesInfo.commonFeatures.earShape} ear shape`,
        `Proper ${seriesInfo.commonFeatures.eyeStyle} eye style`,
        `Authentic ${seriesInfo.commonFeatures.bodyTexture} texture`,
        ...seriesInfo.commonFeatures.accessories.map((acc) => `Includes ${acc}`),
      ],
      counterfeit: seriesInfo.knownCounterfeits.commonIssues,
    }
  }

  // Batch operations for training data
  async batchAddReferenceImages(images: Omit<ReferenceImage, "id" | "createdAt">[]): Promise<void> {
    const batchSize = 100

    for (let i = 0; i < images.length; i += batchSize) {
      const batch = images.slice(i, i + batchSize).map((img) => ({
        ...img,
        created_at: new Date().toISOString(),
      }))

      const { error } = await this.supabase.from("reference_images").insert(batch)

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
        throw error
      }

      console.log(`✅ Inserted batch ${i / batchSize + 1}/${Math.ceil(images.length / batchSize)}`)
    }
  }

  async getTrainingStats(): Promise<{
    totalImages: number
    byAuthenticity: Record<string, number>
    bySeries: Record<string, number>
    byAngle: Record<string, number>
  }> {
    const { data, error } = await this.supabase.rpc("get_training_stats")

    if (error) throw error
    return data
  }
}

// Utility functions for image processing
export async function generateImageEmbedding(imageUrl: string): Promise<number[]> {
  // This would use a pre-trained model to generate embeddings
  // For now, return a mock embedding
  return new Array(512).fill(0).map(() => Math.random())
}

export async function extractImageFeatures(imageUrl: string): Promise<{
  paintQuality: number
  sculptDetails: number
  packagingAuth: number
  materialTexture: number
}> {
  // This would use computer vision to extract features
  // For now, return mock features
  return {
    paintQuality: Math.random() * 100,
    sculptDetails: Math.random() * 100,
    packagingAuth: Math.random() * 100,
    materialTexture: Math.random() * 100,
  }
}
