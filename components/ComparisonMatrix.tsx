"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X, Star } from "lucide-react";
import { ragArchitectures, RAGArchitecture } from "@/lib/ragArchitectures";
import { cn } from "@/lib/utils";

interface ComparisonMatrixProps {
  onClose?: () => void;
}

export function ComparisonMatrix({ onClose }: ComparisonMatrixProps) {
  const [selectedArchitectures, setSelectedArchitectures] = useState<string[]>([
    "naive-rag",
    "hybrid-rag",
  ]);

  const toggleArchitecture = (id: string) => {
    setSelectedArchitectures((prev) =>
      prev.includes(id)
        ? prev.filter((archId) => archId !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const comparedArchitectures = ragArchitectures.filter((arch) =>
    selectedArchitectures.includes(arch.id)
  );

  const metrics = [
    {
      label: "Complexity",
      getValue: (arch: RAGArchitecture) => {
        const complexity = {
          Beginner: 1,
          Intermediate: 2,
          Advanced: 3,
        };
        return complexity[arch.difficulty];
      },
      format: (value: number) => "⭐".repeat(value),
      better: "lower",
    },
    {
      label: "Speed",
      getValue: (arch: RAGArchitecture) => {
        const totalDuration = arch.flowSteps.reduce(
          (sum, step) => sum + step.duration,
          0
        );
        // Invert for speed (lower duration = higher speed)
        return Math.max(1, 5 - Math.floor(totalDuration / 1000));
      },
      format: (value: number) => "⚡".repeat(value),
      better: "higher",
    },
    {
      label: "Accuracy",
      getValue: (arch: RAGArchitecture) => {
        // Estimate based on architecture type
        const accuracyMap: Record<string, number> = {
          "naive-rag": 3,
          "multimodal-rag": 4,
          "hyde-rag": 4,
          "corrective-rag": 5,
          "graph-rag": 4,
          "hybrid-rag": 5,
          "adaptive-rag": 4,
          "agentic-rag": 5,
        };
        return accuracyMap[arch.id] || 3;
      },
      format: (value: number) => "🎯".repeat(value),
      better: "higher",
    },
    {
      label: "Cost Efficiency",
      getValue: (arch: RAGArchitecture) => {
        const llmCalls = arch.flowSteps.filter((s) => s.type === "llm").length;
        return Math.max(1, 5 - llmCalls);
      },
      format: (value: number) => "💰".repeat(value),
      better: "higher",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full max-h-[95vh] md:max-h-[90vh] overflow-auto glass-card border border-border rounded-lg"
      >
        <CardHeader className="sticky top-0 bg-background-card z-10 border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle>Compare Architectures</CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
          <p className="text-sm text-text-secondary mt-2">
            Select up to 3 architectures to compare (click to toggle)
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {/* Architecture Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Select Architectures
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {ragArchitectures.map((arch) => {
                const Icon = arch.icon;
                const isSelected = selectedArchitectures.includes(arch.id);
                const isDisabled =
                  !isSelected && selectedArchitectures.length >= 3;

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
                      <Icon
                        className="w-5 h-5"
                        style={{ color: arch.color }}
                      />
                      <span className="font-medium text-sm text-text-primary">
                        {arch.name}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-accent ml-auto" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Comparison Table */}
          {comparedArchitectures.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-text-primary font-semibold">
                      Metric
                    </th>
                    {comparedArchitectures.map((arch) => (
                      <th
                        key={arch.id}
                        className="text-center p-4 text-text-primary font-semibold min-w-[150px]"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <arch.icon
                            className="w-6 h-6"
                            style={{ color: arch.color }}
                          />
                          <span className="text-sm">{arch.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric, index) => (
                    <tr
                      key={metric.label}
                      className="border-b border-border/50"
                    >
                      <td className="p-4 text-text-secondary font-medium">
                        {metric.label}
                      </td>
                      {comparedArchitectures.map((arch) => {
                        const value = metric.getValue(arch);
                        const maxValue = Math.max(
                          ...comparedArchitectures.map((a) =>
                            metric.getValue(a)
                          )
                        );
                        const isBest =
                          metric.better === "higher"
                            ? value === maxValue
                            : value ===
                              Math.min(
                                ...comparedArchitectures.map((a) =>
                                  metric.getValue(a)
                                )
                              );

                        return (
                          <td
                            key={arch.id}
                            className={cn(
                              "p-4 text-center",
                              isBest && "bg-success/10"
                            )}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-lg">
                                {metric.format(value)}
                              </span>
                              {isBest && (
                                <Badge variant="success" className="text-xs">
                                  Best
                                </Badge>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Recommendations */}
          {comparedArchitectures.length > 0 && (
            <div className="mt-8 p-4 bg-background-darker rounded-lg border border-border">
              <h3 className="font-semibold text-text-primary mb-3">
                Recommendations
              </h3>
              <div className="space-y-2 text-sm text-text-secondary">
                {comparedArchitectures.map((arch) => (
                  <div key={arch.id}>
                    <span className="font-medium text-text-primary">
                      {arch.name}:
                    </span>{" "}
                    {arch.bestFor}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </motion.div>
    </div>
  );
}

