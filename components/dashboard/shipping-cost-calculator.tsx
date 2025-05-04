"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Calculator } from "lucide-react"

interface ShippingCostEstimate {
  baseCost: number
  additionalFees: Record<string, number>
  totalCost: number
  currency: string
  estimatedTransitDays: number
  recommendations: string[]
}

export default function ShippingCostCalculator() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [cargoType, setCargoType] = useState("")
  const [weight, setWeight] = useState("")
  const [volume, setVolume] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [estimate, setEstimate] = useState<ShippingCostEstimate | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!origin || !destination || !cargoType || !weight || !volume) return

    setIsLoading(true)
    setEstimate(null)

    try {
      const response = await fetch("/api/shipping/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin,
          destination,
          cargoType,
          weight: Number.parseFloat(weight),
          volume: Number.parseFloat(volume),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to estimate shipping costs")
      }

      const data = await response.json()
      setEstimate(data)
    } catch (error) {
      console.error("Error estimating shipping costs:", error)
      alert("Failed to estimate shipping costs. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Cost Calculator</CardTitle>
        <CardDescription>Get AI-powered shipping cost estimates</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin Country</Label>
              <Input
                id="origin"
                placeholder="Enter origin country"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination Country</Label>
              <Input
                id="destination"
                placeholder="Enter destination country"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargoType">Cargo Type</Label>
            <Select value={cargoType} onValueChange={setCargoType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select cargo type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Cargo">General Cargo</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Textiles">Textiles</SelectItem>
                <SelectItem value="Food Products">Food Products</SelectItem>
                <SelectItem value="Automotive Parts">Automotive Parts</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Chemicals">Chemicals</SelectItem>
                <SelectItem value="Machinery">Machinery</SelectItem>
                <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                <SelectItem value="Hazardous Materials">Hazardous Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Volume (m³)</Label>
              <Input
                id="volume"
                type="number"
                placeholder="Enter volume in cubic meters"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !origin || !destination || !cargoType || !weight || !volume}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Shipping Cost
              </>
            )}
          </Button>
        </form>

        {estimate && (
          <div className="mt-6 space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Base Shipping Cost:</p>
                <p>
                  {estimate.currency} {estimate.baseCost.toFixed(2)}
                </p>
              </div>

              {Object.entries(estimate.additionalFees).map(([fee, amount], index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <p>{fee}:</p>
                  <p>
                    {estimate.currency} {amount.toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t mt-2 pt-2 flex justify-between items-center font-bold">
                <p>Total Cost:</p>
                <p>
                  {estimate.currency} {estimate.totalCost.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Estimated Transit Time:</p>
              <p className="text-sm">{estimate.estimatedTransitDays} days</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Recommendations:</p>
              <ul className="list-disc pl-5 space-y-1">
                {estimate.recommendations.map((recommendation, index) => (
                  <li key={index} className="text-sm">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
