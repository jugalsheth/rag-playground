"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { RAGArchitecture } from "@/components/RAGArchitecture";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { SideBySideTesting } from "@/components/SideBySideTesting";
import { LearningProgress } from "@/components/LearningProgress";
import { ragArchitectures, getArchitectureById } from "@/lib/ragArchitectures";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitCompare, TestTube, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlaygroundPage() {
  const [selectedArchitectureId, setSelectedArchitectureId] = useState(
    ragArchitectures[0].id
  );
  const [showComparison, setShowComparison] = useState(false);
  const [showSideBySide, setShowSideBySide] = useState(false);

  const selectedArchitecture = getArchitectureById(selectedArchitectureId);

  const difficultyColors = {
    Beginner: "success",
    Intermediate: "warning",
    Advanced: "default",
  } as const;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">
                RAG Architecture Playground
              </h1>
              <p className="text-text-secondary">
                Explore 8 different RAG architectures through interactive
                visualizations
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowComparison(true)}
                className="flex items-center gap-2"
              >
                <GitCompare className="w-4 h-4" />
                Compare
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSideBySide(true)}
                className="flex items-center gap-2"
              >
                <TestTube className="w-4 h-4" />
                Test Side-by-Side
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-4 md:gap-8">
            {/* Left Panel - Architecture List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Learning Progress */}
              <LearningProgress />
              
              <div className="glass-card p-4 md:p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Architectures
                </h2>
                <div className="space-y-2">
                  {ragArchitectures.map((arch) => {
                    const Icon = arch.icon;
                    const isSelected = selectedArchitectureId === arch.id;

                    return (
                      <motion.button
                        key={arch.id}
                        onClick={() => setSelectedArchitectureId(arch.id)}
                        className={`
                          w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                          ${
                            isSelected
                              ? "border-accent bg-background-card"
                              : "border-border bg-background-darker hover:border-accent/50"
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <Icon
                            className="w-6 h-6 flex-shrink-0 mt-1"
                            style={{ color: arch.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-text-primary">
                                {arch.name}
                              </h3>
                              <Badge
                                variant={difficultyColors[arch.difficulty]}
                                className="text-xs"
                              >
                                {arch.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-text-secondary line-clamp-2">
                              {arch.tagline}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel - Architecture Details */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {selectedArchitecture && (
                  <motion.div
                    key={selectedArchitecture.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RAGArchitecture architecture={selectedArchitecture} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {showComparison && (
        <ComparisonMatrix onClose={() => setShowComparison(false)} />
      )}

      {showSideBySide && (
        <SideBySideTesting onClose={() => setShowSideBySide(false)} />
      )}
    </div>
  );
}

