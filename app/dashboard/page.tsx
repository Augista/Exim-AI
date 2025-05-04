import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, FileText, Globe, Package, Plus, Search, Ship } from "lucide-react"
import DashboardMetricCard from "@/components/dashboard/metric-card"
import ShipmentTable from "@/components/dashboard/shipment-table"
import AiAssistant from "@/components/dashboard/ai-assistant"
import DocumentUpload from "@/components/dashboard/document-upload"
import MarketIntelligenceForm from "@/components/dashboard/market-intelligence-form"
import ShippingCostCalculator from "@/components/dashboard/shipping-cost-calculator"
import { createServerClient } from "@/lib/supabase"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = createServerClient()

  const { data: shipmentCounts } = await supabase
    .from("shipments")
    .select("status", { count: "exact", head: false })
    .in("status", ["documentation", "customs_clearance", "in_transit", "delivered"])
    .order("status")

  const { data: documentCounts } = await supabase
    .from("documents")
    .select("validation_status", { count: "exact", head: false })
    .in("validation_status", ["pending", "validated", "rejected"])
    .order("validation_status")

  const { data: marketData } = await supabase
    .from("market_intelligence")
    .select("country, opportunity_score")
    .order("opportunity_score", { ascending: false })
    .limit(5)

  const activeShipments = shipmentCounts?.filter((s) => s.status !== "delivered").length || 0
  const pendingDocuments = documentCounts?.filter((d) => d.validation_status === "pending").length || 0
  const activeMarkets = new Set(marketData?.map((m) => m.country)).size || 0
  const avgOpportunityScore = marketData && marketData.length > 0
  ? marketData.reduce((sum, item) => sum + (item.opportunity_score || 0), 0) / marketData.length
  : 0;


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/new-shipment">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Shipment
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardMetricCard
              title="Active Shipments"
              value={activeShipments.toString()}
              description="Shipments in progress"
              icon={<Package className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardMetricCard
              title="Pending Documents"
              value={pendingDocuments.toString()}
              description="Documents awaiting validation"
              icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardMetricCard
              title="Market Opportunity"
              value={avgOpportunityScore.toFixed(1) + "/10"}
              description="Average opportunity score"
              icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardMetricCard
              title="Active Markets"
              value={activeMarkets.toString()}
              description="Countries with active trade"
              icon={<Globe className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>Your most recent export and import shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <ShipmentTable />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>Ask questions about exports, imports, or get help with documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <AiAssistant />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Document Validation</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {documentCounts?.filter((d) => d.validation_status === "validated").length || 0} /{" "}
                  {documentCounts?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">Documents validated successfully</p>
                <div className="mt-4">
                  <Link href="/dashboard/documents">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Route Optimization</CardTitle>
                <Ship className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">Average cost reduction through AI routing</p>
                <div className="mt-4">
                  <Link href="/dashboard/tracking">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Intelligence</CardTitle>
                <Search className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeMarkets}</div>
                <p className="text-xs text-muted-foreground">Markets with active intelligence data</p>
                <div className="mt-4">
                  <Link href="/dashboard/analytics">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Shipments</CardTitle>
                <CardDescription>Manage and track all your export and import shipments</CardDescription>
              </div>
              <Link href="/dashboard/new-shipment">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Shipment
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <ShipmentTable showAll />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <DocumentUpload shipmentId={1} />

            <Card>
              <CardHeader>
                <CardTitle>Document Analysis</CardTitle>
                <CardDescription>AI-powered document validation and compliance checking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI system analyzes your export and import documents to ensure they comply with international
                  standards and regulations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Validation Accuracy</p>
                    <p className="text-sm">94%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "94%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Compliance Rate</p>
                    <p className="text-sm">87%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "87%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Error Detection</p>
                    <p className="text-sm">96%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "96%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <MarketIntelligenceForm />
            <ShippingCostCalculator />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
