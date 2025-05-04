import { Card, CardContent } from "@/components/ui/card"
import { Globe, Users, Lightbulb, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About EximAI</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Revolutionizing export and import operations with artificial intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At EximAI, we're on a mission to transform the export and import industry through cutting-edge AI
            technology. We believe that international trade should be accessible, efficient, and transparent for
            businesses of all sizes.
          </p>
          <p className="text-gray-600">
            Our platform streamlines complex processes, reduces paperwork, and provides valuable market insights to help
            businesses expand globally with confidence.
          </p>
        </div>
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img src="/placeholder.svg?height=300&width=500" alt="EximAI Team" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
              <p className="text-gray-600">
                We understand the complexities of international trade and design solutions with a global mindset.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of what's possible with AI in the export-import industry.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                We prioritize our customers' needs and build solutions that address their specific challenges.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from product development to customer support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          EximAI was designed and programmed by Gist, bringing together expertise in international trade, artificial
          intelligence, and software development.
        </p>
      </div>
    </div>
  )
}
