import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, FileText, BarChart2, MessageSquare, Map, Bell, Package, Search, Truck } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Export & Import Features</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our platform leverages advanced AI technology to streamline and optimize your export and import operations at
          every stage.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">First Mile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText className="h-12 w-12 text-primary" />}
            title="AI Documentation Systems"
            description="Automatic validation of export documents with customs standards for each destination country. Our AI system checks invoices, packing lists, and bills of lading against the latest regulatory requirements."
          />
          <FeatureCard
            icon={<BarChart2 className="h-12 w-12 text-primary" />}
            title="AI Cost Estimation Systems"
            description="Real-time export cost prediction based on route, volume, commodity type, and latest tariffs. Our AI analyzes thousands of data points to provide the most accurate cost estimates."
          />
          <FeatureCard
            icon={<MessageSquare className="h-12 w-12 text-primary" />}
            title="AI Bot Message for Client and Freight Forwarder"
            description="Multilingual chatbot for client and freight forwarder inquiries, including shipment updates. Our AI assistant can communicate in multiple languages and provide real-time information."
          />
          <FeatureCard
            icon={<Search className="h-12 w-12 text-primary" />}
            title="AI Market Intelligence & Demand Forecasting"
            description="Analysis of foreign market trends based on demand data, pricing, and current regulations from various export destination countries. Our AI helps you identify the best market opportunities."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Middle Mile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Map className="h-12 w-12 text-primary" />}
            title="AI Tracking Systems"
            description="GPS-based container tracking with machine learning to predict delays or damage risks. Our AI system monitors your shipments in real-time and alerts you to potential issues."
          />
          <FeatureCard
            icon={<Truck className="h-12 w-12 text-primary" />}
            title="AI Route Optimization"
            description="Optimal shipping route recommendations based on weather, port congestion, and cost efficiency. Our AI analyzes multiple factors to find the most efficient route for your shipments."
          />
          <FeatureCard
            icon={<Bot className="h-12 w-12 text-primary" />}
            title="Anomaly Detection Systems"
            description="Detection of abnormal logistics behavior (e.g., sudden stops, route deviations) that could indicate potential loss or delay. Our AI system identifies unusual patterns and alerts you immediately."
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Last Mile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bell className="h-12 w-12 text-primary" />}
            title="Integrated AI Receiver Notification and Package Distribution Systems"
            description="Automated notifications to goods recipients and final delivery coordination based on the best time and location. Our AI system ensures smooth last-mile delivery."
          />
          <FeatureCard
            icon={<Package className="h-12 w-12 text-primary" />}
            title="AI Delivery Slot Scheduling"
            description="Automated delivery time scheduling based on recipient preferences and local courier availability. Our AI system optimizes delivery times to ensure customer satisfaction."
          />
          <FeatureCard
            icon={<MessageSquare className="h-12 w-12 text-primary" />}
            title="Feedback Analysis System"
            description="Automatic analysis of customer reviews and feedback to improve final distribution services. Our AI system identifies patterns in customer feedback to help you continuously improve."
          />
        </div>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-primary/10 rounded-full">{icon}</div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
