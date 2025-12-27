"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, DollarSign, Target, BarChart3 } from "lucide-react";
import { RAGArchitecture } from "@/lib/ragArchitectures";
import { motion } from "framer-motion";

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
  // Calculate metrics based on architecture
  const calculateMetrics = (arch: RAGArchitecture): PerformanceMetrics => {
    const totalDuration = arch.flowSteps.reduce((sum, step) => sum + step.duration, 0);
    const llmCalls = arch.flowSteps.filter((s) => s.type === "llm").length;
    const dbCalls = arch.flowSteps.filter((s) => s.type === "database").length;
    
    const complexityMap: Record<string, number> = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };

    // Latency (based on total duration)
    const latency = totalDuration;

    // Cost (based on LLM calls, complexity)
    const cost = Math.min(10, llmCalls * 2 + complexityMap[arch.difficulty] * 1.5);

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
    const accuracy = accuracyMap[arch.id] || 0.80;

    // Complexity (based on difficulty and steps)
    const complexity = complexityMap[arch.difficulty] + (arch.flowSteps.length > 5 ? 1 : 0);

    // Scalability (inverse of complexity, more steps = less scalable)
    const scalability = Math.max(1, 6 - complexity);

    return { latency, cost, accuracy, complexity, scalability };
  };

  const metrics = calculateMetrics(architecture);

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    unit,
    color,
    trend,
  }: {
    icon: any;
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

  const BarMetric = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="text-sm font-semibold text-text-primary">{value.toFixed(1)}/{max}</span>
      </div>
      <div className="h-2 bg-background-darker rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );

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
            value={(metrics.accuracy * 100).toFixed(0)}
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
              value={10 - metrics.cost}
              max={10}
              color="bg-gradient-to-r from-green-500 to-emerald-500"
            />
            <BarMetric
              label="Speed Performance"
              value={5 - metrics.latency / 1000}
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

