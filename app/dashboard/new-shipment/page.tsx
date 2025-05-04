"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBrowserClient } from "@/lib/supabase"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewShipmentPage() {
  const [shipmentNumber, setShipmentNumber] = useState("")
  const [type, setType] = useState<"export" | "import">("export")
  const [originCountry, setOriginCountry] = useState("Indonesia")
  const [destinationCountry, setDestinationCountry] = useState("")
  const [estimatedDeparture, setEstimatedDeparture] = useState("")
  const [estimatedArrival, setEstimatedArrival] = useState("")
  const [value, setValue] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("You must be logged in to create a shipment")
      }

      // Create new shipment
      const { data, error: shipmentError } = await supabase
        .from("shipments")
        .insert({
          shipment_number: shipmentNumber,
          user_id: user.id,
          type,
          status: "documentation",
          origin_country: originCountry,
          destination_country: destinationCountry,
          estimated_departure: estimatedDeparture,
          estimated_arrival: estimatedArrival,
          value: Number.parseFloat(value),
          currency,
        })
        .select()

      if (shipmentError) {
        throw shipmentError
      }

      // Redirect to the shipment details page
      router.push(`/dashboard/shipments/${data[0].id}`)
      router.refresh()
    } catch (error: any) {
      setError(error.message || "Failed to create shipment")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/dashboard" className="flex items-center text-sm mb-6 hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Shipment</CardTitle>
          <CardDescription>Enter the details for your new shipment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="shipmentNumber">Shipment Number</Label>
              <Input
                id="shipmentNumber"
                placeholder="SHP-001"
                value={shipmentNumber}
                onChange={(e) => setShipmentNumber(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Shipment Type</Label>
                <Select value={type} onValueChange={(value: "export" | "import") => setType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="export">Export</SelectItem>
                    <SelectItem value="import">Import</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="originCountry">Origin Country</Label>
                <Input
                  id="originCountry"
                  placeholder="Country of origin"
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationCountry">Destination Country</Label>
              <Input
                id="destinationCountry"
                placeholder="Country of destination"
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimatedDeparture">Estimated Departure Date</Label>
                <Input
                  id="estimatedDeparture"
                  type="date"
                  value={estimatedDeparture}
                  onChange={(e) => setEstimatedDeparture(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedArrival">Estimated Arrival Date</Label>
                <Input
                  id="estimatedArrival"
                  type="date"
                  value={estimatedArrival}
                  onChange={(e) => setEstimatedArrival(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Shipment Value</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="0.00"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="IDR">IDR</SelectItem>
                    <SelectItem value="SGD">SGD</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating shipment...
                </>
              ) : (
                "Create Shipment"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
