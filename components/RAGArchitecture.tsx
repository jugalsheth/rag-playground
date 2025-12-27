"use client";

import { RAGArchitecture as RAGArchitectureType } from "@/lib/ragArchitectures";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { CodeViewer } from "./CodeViewer";
import { InteractiveFlow } from "./InteractiveFlow";
import { DemoPanel } from "./DemoPanel";
import { PerformanceDashboard } from "./PerformanceDashboard";
import { useProgress } from "@/lib/progressContext";
import { useState, useEffect } from "react";

interface RAGArchitectureProps {
  architecture: RAGArchitectureType;
  onRunDemo?: (query: string) => Promise<void>;
}

export function RAGArchitecture({ architecture, onRunDemo }: RAGArchitectureProps) {
  const [activeStepId, setActiveStepId] = useState<string | undefined>();
  const [isRunning, setIsRunning] = useState(false);
  const { updateProgress } = useProgress();

  useEffect(() => {
    // Mark as explored when component mounts
    updateProgress(architecture.id, "explored");
  }, [architecture.id, updateProgress]);

  const handleRunDemo = async (query: string) => {
    setIsRunning(true);
    setActiveStepId(undefined);

    // Animate through steps
    for (const step of architecture.flowSteps) {
      setActiveStepId(step.id);
      await new Promise((resolve) => setTimeout(resolve, step.duration));
    }

    setIsRunning(false);
    if (onRunDemo) {
      await onRunDemo(query);
    }
  };

  const difficultyColors = {
    Beginner: "success",
    Intermediate: "warning",
    Advanced: "default",
  } as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <architecture.icon className="w-8 h-8" style={{ color: architecture.color }} />
          <div>
            <h2 className="text-3xl font-bold text-text-primary">{architecture.name}</h2>
            <p className="text-text-secondary">{architecture.tagline}</p>
          </div>
          <Badge variant={difficultyColors[architecture.difficulty]}>
            {architecture.difficulty}
          </Badge>
        </div>
        <p className="text-text-secondary leading-relaxed">{architecture.description}</p>
      </div>

      {/* Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Architecture Flow</CardTitle>
          <CardDescription>
            Watch how data flows through this architecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InteractiveFlow
            steps={architecture.flowSteps}
            activeStepId={activeStepId}
            isRunning={isRunning}
          />
        </CardContent>
      </Card>

      {/* Demo Panel */}
      <DemoPanel architecture={architecture} onRunDemo={handleRunDemo} />

      {/* Performance Dashboard */}
      {architecture && (
        <PerformanceDashboard architecture={architecture} />
      )}

      {/* Code Snippet */}
      <CodeViewer codeSnippet={architecture.codeSnippet} />

      {/* Details */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Pros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {architecture.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2 text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-warning" />
              Limitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {architecture.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2 text-text-secondary">
                  <XCircle className="w-4 h-4 text-warning mt-1 flex-shrink-0" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases & Best For */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {architecture.useCases.map((useCase, index) => (
                <Badge key={index} variant="outline">
                  {useCase}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best For</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">{architecture.bestFor}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

