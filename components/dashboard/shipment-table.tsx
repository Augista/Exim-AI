"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface Shipment {
  id: number
  shipment_number: string
  destination_country: string
  status: string
  type: string
  estimated_arrival: string
  value: number
  currency: string
}

interface ShipmentTableProps {
  showAll?: boolean
}

export default function ShipmentTable({ showAll = false }: ShipmentTableProps) {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch("/api/shipments")
        if (!response.ok) {
          throw new Error("Failed to fetch shipments")
        }

        const data = await response.json()
        setShipments(data)
      } catch (error) {
        console.error("Error fetching shipments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchShipments()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "customs_clearance":
        return "bg-yellow-100 text-yellow-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "documentation":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    return type === "export" ? "bg-indigo-100 text-indigo-800" : "bg-pink-100 text-pink-800"
  }

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const displayShipments = showAll ? shipments : shipments.slice(0, 5)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (displayShipments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No shipments found</p>
        <Button variant="outline" className="mt-4">
          Create New Shipment
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Est. Arrival</TableHead>
          <TableHead className="text-right">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayShipments.map((shipment) => (
          <TableRow key={shipment.id}>
            <TableCell className="font-medium">{shipment.shipment_number}</TableCell>
            <TableCell>{shipment.destination_country}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(shipment.status)}>
                {formatStatus(shipment.status)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getTypeColor(shipment.type)}>
                {shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{new Date(shipment.estimated_arrival).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              {shipment.currency}{" "}
              {shipment.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
