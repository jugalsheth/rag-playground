"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, DollarSign, Target, BarChart3, LucideIcon } from "lucide-react";
import { RAGArchitecture } from "@/lib/ragArchitectures";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface PerformanceMetrics {
  latency: number; // ms
  cost: number; // relative cost (1-10)
  accuracy: number; // 0-1
  complexity: number; // 1-5
  scalability: number; // 1-5
}

interface PerformanceDashboardProps {
  architecture: RAGArchitecture;
}

export function PerformanceDashboard({ architecture }: PerformanceDashboardProps) {
  // Calculate metrics based on architecture - memoized for performance
  const metrics = useMemo(() => {
    const calculateMetrics = (arch: RAGArchitecture): PerformanceMetrics => {
      try {
        if (!arch || !arch.flowSteps || arch.flowSteps.length === 0) {
          // Return default metrics if architecture data is invalid
          return {
            latency: 2000,
            cost: 5,
            accuracy: 0.80,
            complexity: 2,
            scalability: 3,
          };
        }

        const totalDuration = arch.flowSteps.reduce((sum, step) => sum + (step.duration || 0), 0);
        const llmCalls = arch.flowSteps.filter((s) => s.type === "llm").length;
        
        const complexityMap: Record<string, number> = {
          Beginner: 1,
          Intermediate: 2,
          Advanced: 3,
        };

        // Get difficulty value with fallback
        const difficultyValue = complexityMap[arch.difficulty] || 2;

        // Latency (based on total duration, ensure minimum value)
        const latency = Math.max(100, totalDuration);

        // Cost (based on LLM calls, complexity) - clamp between 1 and 10
        const rawCost = llmCalls * 2 + difficultyValue * 1.5;
        const cost = Math.max(1, Math.min(10, rawCost));

        // Accuracy (estimated based on architecture type)
        const accuracyMap: Record<string, number> = {
          "naive-rag": 0.75,
          "multimodal-rag": 0.82,
          "hyde-rag": 0.88,
          "corrective-rag": 0.92,
          "graph-rag": 0.85,
          "hybrid-rag": 0.90,
          "adaptive-rag": 0.87,
          "agentic-rag": 0.93,
        };
        const accuracy = Math.max(0, Math.min(1, accuracyMap[arch.id] || 0.80));

        // Complexity (based on difficulty and steps) - clamp between 1 and 5
        const baseComplexity = difficultyValue;
        const stepComplexity = arch.flowSteps.length > 5 ? 1 : 0;
        const complexity = Math.max(1, Math.min(5, baseComplexity + stepComplexity));

        // Scalability (inverse of complexity, more steps = less scalable) - clamp between 1 and 5
        const scalability = Math.max(1, Math.min(5, 6 - complexity));

        return { latency, cost, accuracy, complexity, scalability };
      } catch (error) {
        // Return default metrics if calculation fails
        console.error("Error calculating performance metrics:", error);
        return {
          latency: 2000,
          cost: 5,
          accuracy: 0.80,
          complexity: 2,
          scalability: 3,
        };
      }
    };

    // Safely calculate metrics with error handling
    try {
      if (!architecture) {
        throw new Error("Architecture is undefined");
      }
      return calculateMetrics(architecture);
    } catch (error) {
      console.error("Error in PerformanceDashboard:", error);
      return {
        latency: 2000,
        cost: 5,
        accuracy: 0.80,
        complexity: 2,
        scalability: 3,
      };
    }
  }, [architecture]);

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    unit,
    color,
    trend,
  }: {
    icon: LucideIcon;
    label: string;
    value: number | string;
    unit?: string;
    color: string;
    trend?: "up" | "down" | "neutral";
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-sm text-text-secondary">{label}</span>
        </div>
        {trend && (
          <TrendingUp
            className={`w-4 h-4 ${
              trend === "up" ? "text-success" : trend === "down" ? "text-warning" : "text-text-tertiary"
            }`}
          />
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-text-primary">{value}</span>
        {unit && <span className="text-sm text-text-tertiary">{unit}</span>}
      </div>
    </motion.div>
  );

  const BarMetric = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
    // Clamp value between 0 and max to prevent negative or overflow values
    const clampedValue = Math.max(0, Math.min(max, value));
    const percentage = max > 0 ? Math.max(0, Math.min(100, (clampedValue / max) * 100)) : 0;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">{label}</span>
          <span className="text-sm font-semibold text-text-primary">
            {clampedValue.toFixed(1)}/{max}
          </span>
        </div>
        <div className="h-2 bg-background-darker rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${color} rounded-full`}
          />
        </div>
      </div>
    );
  };

  // Validate metrics before rendering
  if (!metrics || typeof metrics.latency !== 'number' || typeof metrics.cost !== 'number' || 
      typeof metrics.accuracy !== 'number' || typeof metrics.complexity !== 'number' || 
      typeof metrics.scalability !== 'number') {
    console.error("Invalid metrics calculated", metrics);
    // Return a fallback UI instead of null
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-text-secondary">Metrics are currently unavailable. Please try refreshing the page.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" />
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={Zap}
            label="Latency"
            value={metrics.latency}
            unit="ms"
            color="text-blue-400"
            trend="down"
          />
          <MetricCard
            icon={DollarSign}
            label="Cost"
            value={metrics.cost.toFixed(1)}
            unit="/10"
            color="text-green-400"
            trend="down"
          />
          <MetricCard
            icon={Target}
            label="Accuracy"
            value={Math.max(0, Math.min(100, metrics.accuracy * 100)).toFixed(0)}
            unit="%"
            color="text-purple-400"
            trend="up"
          />
          <MetricCard
            icon={TrendingUp}
            label="Scalability"
            value={metrics.scalability.toFixed(1)}
            unit="/5"
            color="text-yellow-400"
            trend="up"
          />
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary">Detailed Breakdown</h4>
          <div className="space-y-4 p-4 bg-background-darker rounded-lg">
            <BarMetric
              label="Accuracy Score"
              value={metrics.accuracy * 5}
              max={5}
              color="bg-gradient-to-r from-purple-500 to-pink-500"
            />
            <BarMetric
              label="Cost Efficiency"
              value={Math.max(0, 10 - metrics.cost)}
              max={10}
              color="bg-gradient-to-r from-green-500 to-emerald-500"
            />
            <BarMetric
              label="Speed Performance"
              value={Math.max(0, 5 - metrics.latency / 1000)}
              max={5}
              color="bg-gradient-to-r from-blue-500 to-cyan-500"
            />
            <BarMetric
              label="Scalability"
              value={metrics.scalability}
              max={5}
              color="bg-gradient-to-r from-yellow-500 to-orange-500"
            />
            <BarMetric
              label="Complexity"
              value={metrics.complexity}
              max={5}
              color="bg-gradient-to-r from-red-500 to-pink-500"
            />
          </div>
        </div>

        {/* Performance Summary */}
        <div className="p-4 bg-gradient-to-r from-background-card to-background-darker rounded-lg border border-border">
          <h4 className="font-semibold text-text-primary mb-2">Performance Summary</h4>
          <p className="text-sm text-text-secondary">
            {metrics.accuracy > 0.9
              ? "Excellent accuracy with high-quality results. Best for production systems requiring reliability."
              : metrics.accuracy > 0.85
              ? "Good balance of accuracy and performance. Suitable for most use cases."
              : "Fast and cost-effective. Great for simple queries and learning."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {metrics.latency < 2000 && (
              <Badge variant="success" className="text-xs">Fast</Badge>
            )}
            {metrics.cost < 5 && (
              <Badge variant="success" className="text-xs">Cost-Effective</Badge>
            )}
            {metrics.accuracy > 0.9 && (
              <Badge variant="success" className="text-xs">High Accuracy</Badge>
            )}
            {metrics.scalability > 4 && (
              <Badge variant="success" className="text-xs">Scalable</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

