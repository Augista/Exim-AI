import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, FileText, BarChart2, MessageSquare, Map, Bell } from "lucide-react"

export default function AiFeatureSection() {
  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform leverages advanced AI technology to streamline and optimize your export and import operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AiFeatureCard
            icon={<FileText />}
            title="AI Documentation Systems"
            description="Automatic validation of export documents with customs standards for each destination country."
            phase="First Mile"
          />
          <AiFeatureCard
            icon={<BarChart2 />}
            title="AI Cost Estimation"
            description="Real-time export cost prediction based on route, volume, commodity type, and latest tariffs."
            phase="First Mile"
          />
          <AiFeatureCard
            icon={<MessageSquare />}
            title="AI Bot Messaging"
            description="Multilingual chatbot for client and freight forwarder inquiries, including shipment updates."
            phase="First Mile"
          />
          <AiFeatureCard
            icon={<Map />}
            title="AI Tracking Systems"
            description="GPS-based container tracking with machine learning to predict delays or damage risks."
            phase="Middle Mile"
          />
          <AiFeatureCard
            icon={<Bot />}
            title="AI Route Optimization"
            description="Optimal shipping route recommendations based on weather, port congestion, and cost efficiency."
            phase="Middle Mile"
          />
          <AiFeatureCard
            icon={<Bell />}
            title="AI Receiver Notification"
            description="Automated notifications to goods recipients and final delivery coordination."
            phase="Last Mile"
          />
        </div>
      </div>
    </section>
  )
}

interface AiFeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  phase: "First Mile" | "Middle Mile" | "Last Mile"
}

function AiFeatureCard({ icon, title, description, phase }: AiFeatureCardProps) {
  const phaseColors = {
    "First Mile": "bg-blue-100 text-blue-700",
    "Middle Mile": "bg-purple-100 text-purple-700",
    "Last Mile": "bg-green-100 text-green-700",
  }

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${phaseColors[phase]}`}>{phase}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
