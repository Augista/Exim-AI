"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase"
import { Loader2, MapPin, Ship, Truck, Package } from "lucide-react"
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@/components/ui/timeline"

interface Shipment {
  id: number
  shipment_number: string
  type: string
  status: string
  origin_country: string
  destination_country: string
}

interface TrackingEvent {
  id: number
  shipment_id: number
  location: string
  status: string
  timestamp: string
  notes: string
}

export default function TrackingPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null)
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingEvents, setIsLoadingEvents] = useState(false)
  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const { data, error } = await supabase
          .from("shipments")
          .select("id, shipment_number, type, status, origin_country, destination_country")
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        setShipments(data || [])
        if (data && data.length > 0) {
          setSelectedShipment(data[0].id.toString())
        }
      } catch (error) {
        console.error("Error fetching shipments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchShipments()
  }, [supabase])

  useEffect(() => {
    if (selectedShipment) {
      fetchTrackingEvents(Number.parseInt(selectedShipment))
    }
  }, [selectedShipment])

  const fetchTrackingEvents = async (shipmentId: number) => {
    setIsLoadingEvents(true)
    try {
      const { data, error } = await supabase
        .from("tracking")
        .select("*")
        .eq("shipment_id", shipmentId)
        .order("timestamp", { ascending: false })

      if (error) {
        throw error
      }

      setTrackingEvents(data || [])
    } catch (error) {
      console.error("Error fetching tracking events:", error)
    } finally {
      setIsLoadingEvents(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "departed":
        return <Ship className="h-4 w-4" />
      case "in transit":
        return <Truck className="h-4 w-4" />
      case "arrived":
        return <MapPin className="h-4 w-4" />
      case "delivered":
        return <Package className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "departed":
        return "bg-blue-100 text-blue-800"
      case "in transit":
        return "bg-yellow-100 text-yellow-800"
      case "arrived":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const selectedShipmentData = selectedShipment ? shipments.find((s) => s.id.toString() === selectedShipment) : null

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Shipment Tracking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Shipment</CardTitle>
              <CardDescription>Choose a shipment to track</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shipment">Shipment</Label>
                  <Select value={selectedShipment || ""} onValueChange={setSelectedShipment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a shipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipments.map((shipment) => (
                        <SelectItem key={shipment.id} value={shipment.id.toString()}>
                          {shipment.shipment_number} ({shipment.origin_country} to {shipment.destination_country})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedShipmentData && (
                  <div className="space-y-4 mt-6">
                    <div>
                      <p className="text-sm font-medium">Shipment Number</p>
                      <p className="text-lg">{selectedShipmentData.shipment_number}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <Badge variant="outline" className="mt-1">
                          {selectedShipmentData.type.charAt(0).toUpperCase() + selectedShipmentData.type.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <Badge variant="outline" className="mt-1">
                          {selectedShipmentData.status.replace("_", " ").charAt(0).toUpperCase() +
                            selectedShipmentData.status.replace("_", " ").slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Origin</p>
                        <p>{selectedShipmentData.origin_country}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Destination</p>
                        <p>{selectedShipmentData.destination_country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="map">
            <TabsList className="mb-4">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle>Shipment Location</CardTitle>
                  <CardDescription>Current location and route of your shipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0477879984837!2d112.72915937462395!3d-7.2254183927799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9eb2f3c2e15%3A0x2d71d15a8ca5e0f1!2sPelabuhan%20Tanjung%20Perak!5e0!3m2!1sen!2sid!4v1714903200000!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                  <CardDescription>History of your shipment's journey</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingEvents ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : trackingEvents.length > 0 ? (
                    <Timeline>
                      {trackingEvents.map((event, index) => (
                        <TimelineItem key={event.id}>
                          {index < trackingEvents.length - 1 && <TimelineConnector />}
                          <TimelineHeader>
                            <TimelineIcon className={getStatusColor(event.status)}>
                              {getStatusIcon(event.status)}
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium">{event.location}</p>
                              <Badge variant="outline" className={getStatusColor(event.status)}>
                                {event.status}
                              </Badge>
                            </div>
                          </TimelineHeader>
                          <TimelineBody>
                            <p className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleString()}
                            </p>
                            {event.notes && <p className="text-sm mt-1">{event.notes}</p>}
                          </TimelineBody>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No tracking events found for this shipment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
