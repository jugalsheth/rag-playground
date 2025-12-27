"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, Sparkles } from "lucide-react";
import { getRandomQuery, getDocumentsByIds, type MockDocument } from "@/lib/mockData";
import { RAGArchitecture } from "@/lib/ragArchitectures";
import { formatTime } from "@/lib/utils";

interface DemoPanelProps {
  architecture: RAGArchitecture;
  onRunDemo?: (query: string) => Promise<void>;
}

export function DemoPanel({ architecture, onRunDemo }: DemoPanelProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    documents: MockDocument[];
    answer: string;
    processingTime: number;
    confidence: number;
  } | null>(null);

  const sampleQueries = [
    "What is RAG?",
    "How do vector embeddings work?",
    "Explain neural networks",
    "What's the difference between vector and keyword search?",
  ];

  const handleRunDemo = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResults(null);

    // Simulate API call
    const startTime = Date.now();
    
    // Trigger flow animation if callback provided
    if (onRunDemo) {
      await onRunDemo(query);
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const processingTime = Date.now() - startTime;
    const sampleQuery = getRandomQuery();
    const documents = getDocumentsByIds(sampleQuery.relevantDocs);

    setResults({
      documents,
      answer: sampleQuery.expectedOutput,
      processingTime,
      confidence: 0.85 + Math.random() * 0.1,
    });

    setIsLoading(false);
  };

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Interactive Demo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleRunDemo()}
              placeholder="Ask a question..."
              className="w-full px-4 py-3 bg-background-darker border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <Button
              onClick={handleRunDemo}
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Sample Queries */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-text-secondary whitespace-nowrap">Try:</span>
            {sampleQueries.map((sampleQuery) => (
              <Button
                key={sampleQuery}
                variant="outline"
                size="sm"
                onClick={() => handleSampleQuery(sampleQuery)}
                className="text-xs h-7 whitespace-nowrap"
                disabled={isLoading}
              >
                {sampleQuery.length > 30 ? `${sampleQuery.substring(0, 30)}...` : sampleQuery}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-text-secondary">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing query and retrieving context...</span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-background-darker rounded animate-pulse"
                    style={{ width: `${80 - i * 10}%` }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {results && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Answer */}
              <div className="p-4 bg-background-darker rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-text-primary">Answer</h4>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span>{formatTime(results.processingTime)}</span>
                    <Badge variant="success">
                      {(results.confidence * 100).toFixed(0)}% confidence
                    </Badge>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed">{results.answer}</p>
              </div>

              {/* Retrieved Documents */}
              <div>
                <h4 className="font-semibold text-text-primary mb-3">
                  Retrieved Documents ({results.documents.length})
                </h4>
                <div className="space-y-2">
                  {results.documents.map((doc) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-background-darker rounded-lg border border-border hover:border-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h5 className="font-medium text-text-primary text-sm">
                          {doc.title}
                        </h5>
                        <Badge variant="outline" className="text-xs">
                          {(doc.relevance * 100).toFixed(0)}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-text-tertiary line-clamp-2">
                        {doc.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

