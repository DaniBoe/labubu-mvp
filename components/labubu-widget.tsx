"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"

export function LabubuWidget() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Simulate quick check
      setTimeout(() => {
        setResult(Math.random() > 0.5 ? "genuine" : "suspicious")
      }, 1000)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Quick Authenticity Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>

        {file && <div className="text-sm text-muted-foreground">Selected: {file.name}</div>}

        {result && (
          <div className="flex items-center justify-between">
            <Badge variant={result === "genuine" ? "secondary" : "destructive"}>
              {result === "genuine" ? "Likely Genuine" : "Needs Review"}
            </Badge>
            <Button variant="outline" size="sm">
              Full Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
