"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Upload, Download, Play, Pause, BarChart3 } from "lucide-react"

interface ModelStats {
  name: string
  version: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  trainingImages: number
  lastTrained: string
  status: "active" | "training" | "deprecated"
}

interface TrainingJob {
  id: string
  modelName: string
  status: "running" | "completed" | "failed" | "queued"
  progress: number
  startTime: string
  estimatedCompletion?: string
  metrics?: {
    loss: number
    accuracy: number
    valLoss: number
    valAccuracy: number
  }
}

export default function ModelManagementPage() {
  const [models, setModels] = useState<ModelStats[]>([
    {
      name: "Labubu Classifier",
      version: "v2.1",
      accuracy: 94.2,
      precision: 92.8,
      recall: 95.1,
      f1Score: 93.9,
      trainingImages: 2847,
      lastTrained: "2024-01-15",
      status: "active",
    },
    {
      name: "Similarity Matcher",
      version: "v1.3",
      accuracy: 89.7,
      precision: 88.2,
      recall: 91.3,
      f1Score: 89.7,
      trainingImages: 1923,
      lastTrained: "2024-01-10",
      status: "active",
    },
    {
      name: "Feature Extractor",
      version: "v1.0",
      accuracy: 87.3,
      precision: 85.9,
      recall: 88.7,
      f1Score: 87.3,
      trainingImages: 1456,
      lastTrained: "2024-01-05",
      status: "deprecated",
    },
  ])

  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([
    {
      id: "job_001",
      modelName: "Labubu Classifier v2.2",
      status: "running",
      progress: 67,
      startTime: "2024-01-16 10:30:00",
      estimatedCompletion: "2024-01-16 14:45:00",
      metrics: {
        loss: 0.234,
        accuracy: 0.912,
        valLoss: 0.287,
        valAccuracy: 0.895,
      },
    },
  ])

  const [datasetStats, setDatasetStats] = useState({
    totalImages: 4826,
    authenticImages: 3241,
    fakeImages: 1585,
    seriesCount: 6,
    lastUpdated: "2024-01-15",
  })

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Model Management</h1>
          <p className="text-muted-foreground">Monitor and manage Labubu authenticity detection models</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Training Data
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Start Training
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="training">Training Jobs</TabsTrigger>
          <TabsTrigger value="dataset">Dataset</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge
                      variant={
                        model.status === "active" ? "default" : model.status === "training" ? "secondary" : "outline"
                      }
                    >
                      {model.status}
                    </Badge>
                  </div>
                  <CardDescription>Version {model.version}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Accuracy</div>
                      <div className="text-2xl font-bold text-green-600">{model.accuracy}%</div>
                    </div>
                    <div>
                      <div className="font-medium">F1 Score</div>
                      <div className="text-2xl font-bold text-blue-600">{model.f1Score}%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Precision</span>
                      <span>{model.precision}%</span>
                    </div>
                    <Progress value={model.precision} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Recall</span>
                      <span>{model.recall}%</span>
                    </div>
                    <Progress value={model.recall} className="h-2" />
                  </div>

                  <div className="pt-2 border-t text-xs text-muted-foreground">
                    <div>Training Images: {model.trainingImages.toLocaleString()}</div>
                    <div>Last Trained: {model.lastTrained}</div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Retrain
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          {trainingJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{job.modelName}</CardTitle>
                  <Badge
                    variant={
                      job.status === "running"
                        ? "default"
                        : job.status === "completed"
                          ? "secondary"
                          : job.status === "failed"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
                <CardDescription>Started: {job.startTime}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.status === "running" && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Training Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <Progress value={job.progress} className="h-3" />
                    </div>

                    {job.estimatedCompletion && (
                      <div className="text-sm text-muted-foreground">
                        Estimated completion: {job.estimatedCompletion}
                      </div>
                    )}

                    {job.metrics && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Training Loss</div>
                          <div className="text-lg font-bold">{job.metrics.loss.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="font-medium">Training Accuracy</div>
                          <div className="text-lg font-bold">{(job.metrics.accuracy * 100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="font-medium">Validation Loss</div>
                          <div className="text-lg font-bold">{job.metrics.valLoss.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="font-medium">Validation Accuracy</div>
                          <div className="text-lg font-bold">{(job.metrics.valAccuracy * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    )}

                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Training
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="dataset" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{datasetStats.totalImages.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Training samples</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Authentic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{datasetStats.authenticImages.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {((datasetStats.authenticImages / datasetStats.totalImages) * 100).toFixed(1)}% of total
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Counterfeit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{datasetStats.fakeImages.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {((datasetStats.fakeImages / datasetStats.totalImages) * 100).toFixed(1)}% of total
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Series Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{datasetStats.seriesCount}</div>
                <div className="text-sm text-muted-foreground">Complete series</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dataset Balance</CardTitle>
              <CardDescription>Distribution of training data across categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Authentic Images</span>
                  <span>{datasetStats.authenticImages.toLocaleString()}</span>
                </div>
                <Progress value={(datasetStats.authenticImages / datasetStats.totalImages) * 100} className="h-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Counterfeit Images</span>
                  <span>{datasetStats.fakeImages.toLocaleString()}</span>
                </div>
                <Progress value={(datasetStats.fakeImages / datasetStats.totalImages) * 100} className="h-3" />
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Dataset is{" "}
                  {datasetStats.authenticImages > datasetStats.fakeImages ? "skewed toward authentic" : "balanced"}.
                  Consider adding more{" "}
                  {datasetStats.authenticImages > datasetStats.fakeImages ? "counterfeit" : "authentic"} samples for
                  better balance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Model Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {models
                    .filter((m) => m.status === "active")
                    .map((model, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{model.name}</span>
                          <span>{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Analyses Today</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-bold">2.3s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-bold text-green-600">99.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Satisfaction</span>
                    <span className="font-bold text-blue-600">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
