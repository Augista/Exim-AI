import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Function to generate a response from Gemini
export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    // For text-only input, use the gemini-1.5-pro-001 model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error("Error generating Gemini response:", error)
    return "Sorry, I encountered an error. Please try again later."
  }
}

// Function to analyze a document with Gemini
export async function analyzeDocument(
  documentType: string,
  documentContent: string,
): Promise<{
  isValid: boolean
  issues: string[]
  suggestions: string[]
}> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" })

    const prompt = `
      You are an expert in international trade documentation.
      Please analyze this ${documentType} document and check for any issues or errors.
      Provide a detailed analysis including:
      1. Is this document valid and compliant with international standards?
      2. List any issues or errors found in the document.
      3. Provide suggestions for improvement.
      
      Document content:
      ${documentContent}
      
      Format your response as JSON with the following structure:
      {
        "isValid": boolean,
        "issues": [list of issues found],
        "suggestions": [list of suggestions]
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", e)
      return {
        isValid: false,
        issues: ["Failed to analyze document"],
        suggestions: ["Please try again or contact support"],
      }
    }
  } catch (error) {
    console.error("Error analyzing document with Gemini:", error)
    return {
      isValid: false,
      issues: ["Error analyzing document"],
      suggestions: ["Please try again later"],
    }
  }
}

// Function to generate market intelligence with Gemini
export async function generateMarketIntelligence(
  country: string,
  productCategory: string,
): Promise<{
  demandTrend: "increasing" | "stable" | "decreasing"
  priceTrend: "increasing" | "stable" | "decreasing"
  regulatoryChanges: string
  opportunityScore: number
  analysis: string
}> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" })

    const prompt = `
      You are an expert in international trade and market analysis.
      Please provide market intelligence for exporting ${productCategory} to ${country}.
      Include information about:
      1. Current demand trends (increasing, stable, or decreasing)
      2. Price trends (increasing, stable, or decreasing)
      3. Recent or upcoming regulatory changes
      4. Overall opportunity score (0-10, where 10 is highest opportunity)
      5. Brief analysis of the market situation
      
      Format your response as JSON with the following structure:
      {
        "demandTrend": "increasing|stable|decreasing",
        "priceTrend": "increasing|stable|decreasing",
        "regulatoryChanges": "description of changes",
        "opportunityScore": number,
        "analysis": "brief analysis"
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", e)
      return {
        demandTrend: "stable",
        priceTrend: "stable",
        regulatoryChanges: "Unable to retrieve regulatory information",
        opportunityScore: 5,
        analysis: "Failed to generate market analysis. Please try again.",
      }
    }
  } catch (error) {
    console.error("Error generating market intelligence with Gemini:", error)
    return {
      demandTrend: "stable",
      priceTrend: "stable",
      regulatoryChanges: "Error retrieving regulatory information",
      opportunityScore: 5,
      analysis: "An error occurred while generating market analysis. Please try again later.",
    }
  }
}

export async function estimateShippingCosts(
  origin: string,
  destination: string,
  cargoType: string,
  weight: number,
  volume: number,
): Promise<{
  baseCost: number
  additionalFees: Record<string, number>
  totalCost: number
  currency: string
  estimatedTransitDays: number
  recommendations: string[]
}> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-001" })

    const prompt = `
      You are an expert in international shipping and logistics.
      Please estimate shipping costs for the following cargo:
      - Origin: ${origin}
      - Destination: ${destination}
      - Cargo Type: ${cargoType}
      - Weight: ${weight} kg
      - Volume: ${volume} cubic meters
      
      Provide a detailed cost breakdown including:
      1. Base shipping cost
      2. Additional fees (customs, handling, documentation, etc.)
      3. Total cost
      4. Currency (use USD)
      5. Estimated transit time in days
      6. Cost-saving recommendations
      
      Format your response as JSON with the following structure:
      {
        "baseCost": number,
        "additionalFees": {
          "customsClearance": number,
          "handlingFee": number,
          "documentationFee": number,
        },
        "totalCost": number,
        "currency": "USD",
        "estimatedTransitDays": number,
        "recommendations": [list of recommendations]
      }
        Respond ONLY with JSON.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      const cleanedText = text
        .replace(/```json\s*/, '')  
        .replace(/```/, '')         
        .trim();

      return JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", e)
      return {
        baseCost: 1000,
        additionalFees: { "estimation error": 0 },
        totalCost: 1000,
        currency: "USD",
        estimatedTransitDays: 14,
        recommendations: ["Failed to generate accurate recommendations. Please try again."],
      }
    }
  } catch (error) {
    console.error("Error estimating shipping costs with Gemini:", error)
    return {
      baseCost: 1000,
      additionalFees: { "estimation error": 0 },
      totalCost: 1000,
      currency: "USD",
      estimatedTransitDays: 14,
      recommendations: ["An error occurred while estimating costs. Please try again later."],
    }
  }
}
