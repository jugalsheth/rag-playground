"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FlowStep, FlowStepType } from "@/lib/ragArchitectures";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Cpu,
  Database,
  Brain,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const stepIcons: Record<FlowStepType, typeof MessageSquare> = {
  input: MessageSquare,
  process: Cpu,
  database: Database,
  llm: Brain,
  output: CheckCircle,
};

const stepColors: Record<FlowStepType, string> = {
  input: "text-blue-400",
  process: "text-purple-400",
  database: "text-green-400",
  llm: "text-red-400",
  output: "text-yellow-400",
};

const stepBgColors: Record<FlowStepType, string> = {
  input: "bg-blue-400/20 border-blue-400/50",
  process: "bg-purple-400/20 border-purple-400/50",
  database: "bg-green-400/20 border-green-400/50",
  llm: "bg-red-400/20 border-red-400/50",
  output: "bg-yellow-400/20 border-yellow-400/50",
};

interface InteractiveFlowProps {
  steps: FlowStep[];
  activeStepId?: string;
  isRunning?: boolean;
}

export function InteractiveFlow({
  steps,
  activeStepId,
  isRunning = false,
}: InteractiveFlowProps) {
  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 overflow-x-auto pb-4">
        <AnimatePresence mode="wait">
          {steps.map((step, index) => {
            const Icon = stepIcons[step.type];
            const isActive = activeStepId === step.id;
            const isCompleted = steps.findIndex((s) => s.id === activeStepId) > index;

            return (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isActive ? 1.1 : isCompleted ? 1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "relative flex flex-col items-center",
                    isActive && "z-10"
                  )}
                >
                  {/* Node */}
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                      boxShadow: isActive
                        ? [
                            "0 0 0px rgba(0, 212, 255, 0)",
                            "0 0 20px rgba(0, 212, 255, 0.8)",
                            "0 0 0px rgba(0, 212, 255, 0)",
                          ]
                        : "0 0 0px rgba(0, 212, 255, 0)",
                    }}
                    transition={{
                      duration: 1,
                      repeat: isActive ? Infinity : 0,
                    }}
                    className={cn(
                      "w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      stepBgColors[step.type],
                      isActive && "ring-4 ring-accent/50",
                      isCompleted && "opacity-100",
                      !isActive && !isCompleted && "opacity-50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-8 h-8 transition-colors",
                        stepColors[step.type],
                        isActive && "animate-pulse"
                      )}
                    />
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-center"
                  >
                    <div
                      className={cn(
                        "text-sm font-medium",
                        isActive ? "text-text-primary" : "text-text-secondary"
                      )}
                    >
                      {step.label}
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-text-tertiary mt-1 max-w-[120px]"
                      >
                        {step.description}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Tooltip on hover */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="bg-background-card border border-border rounded-lg p-2 text-xs text-text-secondary whitespace-nowrap shadow-lg">
                      {step.description}
                    </div>
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                      opacity: isCompleted || isActive ? 1 : 0.3,
                      pathLength: isCompleted || isActive ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.5 }}
                    className="mx-2 md:mx-4"
                  >
                    <ArrowRight className="w-6 h-6 text-text-tertiary hidden md:block" />
                    <ArrowRight className="w-6 h-6 text-text-tertiary rotate-90 block md:hidden" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <div className="text-sm text-text-secondary">
            Processing...
          </div>
        </motion.div>
      )}
    </div>
  );
}

