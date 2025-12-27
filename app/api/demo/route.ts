import { NextRequest, NextResponse } from "next/server";
import { getRandomQuery, getDocumentsByIds } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const { architecture, query } = await req.json();

    // Simulate processing time (1.2s - 2.3s)
    const processingTime = 1200 + Math.random() * 1100;
    await new Promise((resolve) => setTimeout(resolve, processingTime));

    // Get mock results
    const sampleQuery = getRandomQuery();
    const documents = getDocumentsByIds(sampleQuery.relevantDocs);

    // Simulate different response characteristics per architecture
    const responses: Record<string, any> = {
      "naive-rag": {
        documents: documents.slice(0, 3),
        answer: sampleQuery.expectedOutput,
        processingTime: Math.round(processingTime),
        confidence: 0.85 + Math.random() * 0.1,
      },
      "multimodal-rag": {
        documents: documents.slice(0, 4),
        answer: sampleQuery.expectedOutput + " [Includes visual context]",
        processingTime: Math.round(processingTime * 1.2),
        confidence: 0.88 + Math.random() * 0.08,
      },
      "hyde-rag": {
        documents: documents.slice(0, 3),
        answer: sampleQuery.expectedOutput + " [Enhanced with hypothetical reasoning]",
        processingTime: Math.round(processingTime * 1.5),
        confidence: 0.90 + Math.random() * 0.08,
      },
      "corrective-rag": {
        documents: documents.slice(0, 5),
        answer: sampleQuery.expectedOutput + " [Self-corrected for accuracy]",
        processingTime: Math.round(processingTime * 2),
        confidence: 0.92 + Math.random() * 0.06,
      },
      "graph-rag": {
        documents: documents.slice(0, 4),
        answer: sampleQuery.expectedOutput + " [Enhanced with graph relationships]",
        processingTime: Math.round(processingTime * 1.3),
        confidence: 0.87 + Math.random() * 0.1,
      },
      "hybrid-rag": {
        documents: documents.slice(0, 5),
        answer: sampleQuery.expectedOutput + " [Combined semantic + keyword results]",
        processingTime: Math.round(processingTime * 1.1),
        confidence: 0.89 + Math.random() * 0.09,
      },
      "adaptive-rag": {
        documents: documents.slice(0, 3),
        answer: sampleQuery.expectedOutput + " [Optimized routing]",
        processingTime: Math.round(processingTime * 0.8),
        confidence: 0.86 + Math.random() * 0.1,
      },
      "agentic-rag": {
        documents: documents.slice(0, 6),
        answer: sampleQuery.expectedOutput + " [Generated with multi-step reasoning]",
        processingTime: Math.round(processingTime * 2.5),
        confidence: 0.91 + Math.random() * 0.07,
      },
    };

    const response = responses[architecture] || responses["naive-rag"];

    return NextResponse.json(response);
  } catch (error) {
    console.error("Demo API error:", error);
    return NextResponse.json(
      { error: "Failed to process demo" },
      { status: 500 }
    );
  }
}

