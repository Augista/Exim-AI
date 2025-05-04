import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your export and import business needs
        </p>
      </div>

      <div className="flex justify-center items-center">
        <Card className="w-full max-w-3xl border-2 border-primary shadow-lg">
          <CardHeader className="text-center bg-primary/5 border-b border-primary/20">
            <CardTitle className="text-3xl font-bold text-primary">Coming Soon</CardTitle>
            <CardDescription className="text-lg">Our pricing plans will be launched shortly</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <p>AI-powered document validation</p>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <p>Real-time shipment tracking</p>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <p>Market intelligence reports</p>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <p>Cost optimization recommendations</p>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <p>24/7 AI assistant support</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-lg font-bold mb-4">Stay tuned for our official launch!</p>
            <Button size="lg">Join Waitlist</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
