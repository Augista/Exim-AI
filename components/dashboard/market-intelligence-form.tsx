"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface MarketIntelligenceResult {
  demandTrend: "increasing" | "stable" | "decreasing"
  priceTrend: "increasing" | "stable" | "decreasing"
  regulatoryChanges: string
  opportunityScore: number
  analysis: string
}

export default function MarketIntelligenceForm() {
  const [country, setCountry] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MarketIntelligenceResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!country || !productCategory) return

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/market-intelligence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          productCategory,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate market intelligence")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error generating market intelligence:", error)
      alert("Failed to generate market intelligence. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getTrendIcon = (trend: "increasing" | "stable" | "decreasing") => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case "stable":
        return <Minus className="h-4 w-4 text-amber-600" />
    }
  }

  const getTrendColor = (trend: "increasing" | "stable" | "decreasing") => {
    switch (trend) {
      case "increasing":
        return "bg-green-100 text-green-800"
      case "decreasing":
        return "bg-red-100 text-red-800"
      case "stable":
        return "bg-amber-100 text-amber-800"
    }
  }

  const getOpportunityColor = (score: number) => {
    if (score >= 8) return "bg-green-100 text-green-800"
    if (score >= 6) return "bg-amber-100 text-amber-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Intelligence</CardTitle>
        <CardDescription>Get AI-powered market insights for your export destinations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Destination Country</Label>
            <Input
              id="country"
              placeholder="Enter country name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productCategory">Product Category</Label>
            <Select value={productCategory} onValueChange={setProductCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select product category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Textiles">Textiles</SelectItem>
                <SelectItem value="Food Products">Food Products</SelectItem>
                <SelectItem value="Automotive Parts">Automotive Parts</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Chemicals">Chemicals</SelectItem>
                <SelectItem value="Machinery">Machinery</SelectItem>
                <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                <SelectItem value="Toys">Toys</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isLoading || !country || !productCategory} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Intelligence...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Generate Market Intelligence
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Demand Trend</p>
                <Badge variant="outline" className={getTrendColor(result.demandTrend)}>
                  <span className="flex items-center gap-1">
                    {getTrendIcon(result.demandTrend)}
                    {result.demandTrend.charAt(0).toUpperCase() + result.demandTrend.slice(1)}
                  </span>
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Price Trend</p>
                <Badge variant="outline" className={getTrendColor(result.priceTrend)}>
                  <span className="flex items-center gap-1">
                    {getTrendIcon(result.priceTrend)}
                    {result.priceTrend.charAt(0).toUpperCase() + result.priceTrend.slice(1)}
                  </span>
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Opportunity Score</p>
              <Badge variant="outline" className={getOpportunityColor(result.opportunityScore)}>
                {result.opportunityScore}/10
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Regulatory Changes</p>
              <p className="text-sm">{result.regulatoryChanges}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Market Analysis</p>
              <p className="text-sm">{result.analysis}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
