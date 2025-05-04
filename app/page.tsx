import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Globe, Package, Search, Shield, Truck } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import HeroSection from "@/components/hero-section"
import AiFeatureSection from "@/components/ai-feature-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Export & Import Solutions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-primary" />}
              title="Global Market Access"
              description="Connect with international markets and expand your business reach worldwide."
            />
            <FeatureCard
              icon={<Package className="h-10 w-10 text-primary" />}
              title="Customs Documentation"
              description="Automated customs documentation with AI validation for faster clearance."
            />
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-primary" />}
              title="Logistics Management"
              description="End-to-end logistics tracking and management with real-time updates."
            />
            <FeatureCard
              icon={<Search className="h-10 w-10 text-primary" />}
              title="Market Intelligence"
              description="AI-powered market insights and demand forecasting for strategic decisions."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Compliance Assurance"
              description="Stay compliant with international trade regulations and standards."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Cost Optimization"
              description="AI-driven cost estimation and route optimization for maximum efficiency."
            />
          </div>
        </div>
      </section>

      <AiFeatureSection />

      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Export & Import Business?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have streamlined their international trade operations with our AI-powered
            platform.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="font-medium">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
