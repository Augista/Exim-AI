"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Upload, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface DocumentUploadProps {
  shipmentId: number
  onUploadComplete?: () => void
}

export default function DocumentUpload({ shipmentId, onUploadComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [documentContent, setDocumentContent] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    isValid: boolean
    issues: string[]
    suggestions: string[]
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!documentType || !documentContent) return

    setIsAnalyzing(true)
    setAnalysisResult(null)

    try {
      const response = await fetch("/api/documents/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentType,
          documentContent,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze document")
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error analyzing document:", error)
      setAnalysisResult({
        isValid: false,
        issues: ["Failed to analyze document. Please try again."],
        suggestions: [],
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleUpload = async () => {
    if (!file || !documentType) return

    setIsUploading(true)

    try {
      // In a real implementation, you would upload the file to storage
      // For now, we'll simulate a successful upload

      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create document record in database
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipment_id: shipmentId,
          type: documentType,
          file_path: `/documents/${shipmentId}/${file.name}`,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          validation_status: analysisResult?.isValid ? "validated" : "pending",
          validation_notes: analysisResult
            ? JSON.stringify({ issues: analysisResult.issues, suggestions: analysisResult.suggestions })
            : "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create document record")
      }

      // Reset form
      setFile(null)
      setDocumentType("")
      setDocumentContent("")
      setAnalysisResult(null)

      // Notify parent component
      if (onUploadComplete) {
        onUploadComplete()
      }
    } catch (error) {
      console.error("Error uploading document:", error)
      alert("Failed to upload document. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload and validate export/import documents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="documentType">Document Type</Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="invoice">Commercial Invoice</SelectItem>
              <SelectItem value="packing_list">Packing List</SelectItem>
              <SelectItem value="bill_of_lading">Bill of Lading</SelectItem>
              <SelectItem value="certificate_of_origin">Certificate of Origin</SelectItem>
              <SelectItem value="customs_declaration">Customs Declaration</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">Document File</Label>
          <div className="flex items-center gap-2">
            <Input id="file" type="file" onChange={handleFileChange} className="flex-1" />
          </div>
          {file && (
            <p className="text-sm text-muted-foreground">
              Selected: {file.name} ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="documentContent">Document Content (for AI validation)</Label>
          <Textarea
            id="documentContent"
            placeholder="Paste the document content here for AI validation..."
            value={documentContent}
            onChange={(e) => setDocumentContent(e.target.value)}
            rows={6}
          />
          <p className="text-xs text-muted-foreground">
            Paste the document content to enable AI-powered validation and compliance checking.
          </p>
        </div>

        {documentContent && documentType && (
          <Button type="button" variant="outline" onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Analyze Document
              </>
            )}
          </Button>
        )}

        {analysisResult && (
          <Alert variant={analysisResult.isValid ? "default" : "destructive"}>
            <div className="flex items-center gap-2">
              {analysisResult.isValid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <div>
                <AlertTitle>{analysisResult.isValid ? "Document Valid" : "Document Issues Detected"}</AlertTitle>
                <AlertDescription>
                  {analysisResult.isValid ? (
                    <p>This document appears to be valid and compliant.</p>
                  ) : (
                    <div className="mt-2">
                      <p className="font-medium">Issues:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {analysisResult.issues.map((issue, i) => (
                          <li key={i} className="text-sm">
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResult.suggestions.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Suggestions:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {analysisResult.suggestions.map((suggestion, i) => (
                          <li key={i} className="text-sm">
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || !documentType || isUploading} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
