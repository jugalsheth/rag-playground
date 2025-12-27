"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Send, Loader2, GitCompare, TrendingUp, Clock, Target } from "lucide-react";
import { ragArchitectures, RAGArchitecture, getArchitectureById } from "@/lib/ragArchitectures";
import { getRandomQuery, getDocumentsByIds } from "@/lib/mockData";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SideBySideTestingProps {
  onClose?: () => void;
}

interface TestResult {
  architecture: RAGArchitecture;
  answer: string;
  documents: any[];
  processingTime: number;
  confidence: number;
  latency: number;
}

export function SideBySideTesting({ onClose }: SideBySideTestingProps) {
  const [selectedArchitectures, setSelectedArchitectures] = useState<string[]>([
    "naive-rag",
    "hybrid-rag",
  ]);
  const [query, setQuery] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const toggleArchitecture = (id: string) => {
    setSelectedArchitectures((prev) =>
      prev.includes(id)
        ? prev.filter((archId) => archId !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  };

  const handleRunTest = async () => {
    if (!query.trim() || selectedArchitectures.length === 0) return;

    setIsRunning(true);
    setResults([]);

    const testResults: TestResult[] = [];

    // Run test for each selected architecture
    for (const archId of selectedArchitectures) {
      const arch = getArchitectureById(archId);
      if (!arch) continue;

      const startTime = Date.now();
      
      // Simulate processing
      const processingTime = 1200 + Math.random() * 1100;
      await new Promise((resolve) => setTimeout(resolve, processingTime));

      const sampleQuery = getRandomQuery();
      const documents = getDocumentsByIds(sampleQuery.relevantDocs);

      testResults.push({
        architecture: arch,
        answer: sampleQuery.expectedOutput,
        documents,
        processingTime,
        confidence: 0.85 + Math.random() * 0.1,
        latency: Date.now() - startTime,
      });
    }

    setResults(testResults);
    setIsRunning(false);
  };

  const selectedArchs = selectedArchitectures
    .map((id) => getArchitectureById(id))
    .filter(Boolean) as RAGArchitecture[];

  const bestResult = results.length > 0
    ? results.reduce((best, current) =>
        current.confidence > best.confidence ? current : best
      )
    : null;

  const fastestResult = results.length > 0
    ? results.reduce((fastest, current) =>
        current.latency < fastest.latency ? current : fastest
      )
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl w-full max-h-[95vh] overflow-auto glass-card border border-border rounded-lg"
      >
        <CardHeader className="sticky top-0 bg-background-card z-10 border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-accent" />
              Side-by-Side Testing
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
          <p className="text-sm text-text-secondary mt-2">
            Test the same query across multiple architectures simultaneously
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Architecture Selection */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Select Architectures (up to 4)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ragArchitectures.map((arch) => {
                const Icon = arch.icon;
                const isSelected = selectedArchitectures.includes(arch.id);
                const isDisabled = !isSelected && selectedArchitectures.length >= 4;

                return (
                  <motion.button
                    key={arch.id}
                    onClick={() => toggleArchitecture(arch.id)}
                    disabled={isDisabled}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all text-left",
                      isSelected
                        ? "border-accent bg-background-card"
                        : "border-border bg-background-darker",
                      isDisabled && "opacity-50 cursor-not-allowed",
                      !isDisabled && "hover:border-accent/50"
                    )}
                    whileHover={!isDisabled ? { scale: 1.02 } : {}}
                    whileTap={!isDisabled ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5" style={{ color: arch.color }} />
                      <span className="font-medium text-sm text-text-primary">
                        {arch.name}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="text-xs text-accent mt-1">Selected</div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Query Input */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Test Query</h3>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isRunning && handleRunTest()}
                placeholder="Enter a query to test across all selected architectures..."
                className="w-full px-4 py-3 bg-background-darker border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                disabled={isRunning || selectedArchitectures.length === 0}
              />
              <Button
                onClick={handleRunTest}
                disabled={isRunning || !query.trim() || selectedArchitectures.length === 0}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                size="sm"
              >
                {isRunning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {isRunning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
                <p className="text-text-secondary">Running tests across {selectedArchitectures.length} architectures...</p>
              </motion.div>
            )}

            {results.length > 0 && !isRunning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Comparison Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background-darker rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-medium text-text-primary">Best Accuracy</span>
                    </div>
                    {bestResult && (
                      <div>
                        <div className="font-bold text-text-primary">
                          {bestResult.architecture.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {(bestResult.confidence * 100).toFixed(1)}% confidence
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-background-darker rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium text-text-primary">Fastest</span>
                    </div>
                    {fastestResult && (
                      <div>
                        <div className="font-bold text-text-primary">
                          {fastestResult.architecture.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {formatTime(fastestResult.latency)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-background-darker rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium text-text-primary">Average</span>
                    </div>
                    <div>
                      <div className="font-bold text-text-primary">
                        {(results.reduce((sum, r) => sum + r.confidence, 0) / results.length * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-text-secondary">
                        {formatTime(results.reduce((sum, r) => sum + r.latency, 0) / results.length)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side-by-Side Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.architecture.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "p-4 rounded-lg border-2",
                        result === bestResult
                          ? "border-purple-400/50 bg-purple-400/5"
                          : result === fastestResult
                          ? "border-blue-400/50 bg-blue-400/5"
                          : "border-border bg-background-darker"
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <result.architecture.icon
                            className="w-5 h-5"
                            style={{ color: result.architecture.color }}
                          />
                          <h4 className="font-semibold text-text-primary">
                            {result.architecture.name}
                          </h4>
                        </div>
                        <div className="flex gap-2">
                          {result === bestResult && (
                            <Badge variant="success" className="text-xs">Best Accuracy</Badge>
                          )}
                          {result === fastestResult && (
                            <Badge variant="outline" className="text-xs">Fastest</Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">Confidence</span>
                          <span className="text-text-primary font-medium">
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">Latency</span>
                          <span className="text-text-primary font-medium">
                            {formatTime(result.latency)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">Documents</span>
                          <span className="text-text-primary font-medium">
                            {result.documents.length}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-background rounded-lg border border-border">
                        <p className="text-sm text-text-secondary line-clamp-3">
                          {result.answer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </motion.div>
    </div>
  );
}

