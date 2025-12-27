"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, CheckCircle2, Sparkles, Target } from "lucide-react";
import { ragArchitectures } from "@/lib/ragArchitectures";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/lib/progressContext";

export function LearningProgress() {
  const { progress } = useProgress();

  const totalArchitectures = ragArchitectures.length;
  const exploredCount = progress.explored.length;
  const completedCount = progress.completed.length;
  const progressPercentage = (exploredCount / totalArchitectures) * 100;

  const getNextArchitecture = () => {
    const notExplored = ragArchitectures.find(
      (arch) => !progress.explored.includes(arch.id)
    );
    return notExplored || ragArchitectures[0];
  };

  const getAchievements = () => {
    const achievements = [];
    if (exploredCount >= 1) achievements.push({ icon: Sparkles, label: "First Steps", color: "text-blue-400" });
    if (exploredCount >= 4) achievements.push({ icon: Award, label: "Explorer", color: "text-purple-400" });
    if (exploredCount >= 8) achievements.push({ icon: Trophy, label: "Master Explorer", color: "text-yellow-400" });
    if (completedCount >= 4) achievements.push({ icon: Target, label: "Halfway There", color: "text-green-400" });
    if (completedCount >= 8) achievements.push({ icon: Trophy, label: "RAG Master", color: "text-accent" });
    return achievements;
  };

  const achievements = getAchievements();
  const nextArch = getNextArchitecture();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">
              Overall Progress
            </span>
            <span className="text-sm text-text-secondary">
              {exploredCount}/{totalArchitectures} explored
            </span>
          </div>
          <div className="relative">
            <div className="h-3 bg-background-darker rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-accent via-primary to-accent"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>{Math.round(progressPercentage)}% Complete</span>
            <span>{completedCount} fully completed</span>
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Achievements</h4>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1.5 px-3 py-1"
                    >
                      <achievement.icon className={`w-3.5 h-3.5 ${achievement.color}`} />
                      <span className="text-xs">{achievement.label}</span>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Next Up */}
        {exploredCount < totalArchitectures && (
          <div className="p-4 bg-background-darker rounded-lg border border-border">
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              Next Up
            </h4>
            <p className="text-sm text-text-secondary mb-2">
              Continue your learning journey with:
            </p>
            <div className="flex items-center gap-2">
              <nextArch.icon
                className="w-5 h-5"
                style={{ color: nextArch.color }}
              />
              <span className="font-medium text-text-primary">{nextArch.name}</span>
              <Badge variant="outline" className="text-xs">
                {nextArch.difficulty}
              </Badge>
            </div>
          </div>
        )}

        {/* Architecture Checklist */}
        <div>
          <h4 className="text-sm font-semibold text-text-primary mb-3">
            Architecture Checklist
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {ragArchitectures.map((arch) => {
              const isExplored = progress.explored.includes(arch.id);
              const isCompleted = progress.completed.includes(arch.id);
              const Icon = arch.icon;

              return (
                <motion.div
                  key={arch.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-darker transition-colors"
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : isExplored ? (
                      <div className="w-5 h-5 rounded-full border-2 border-accent" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-border" />
                    )}
                  </div>
                  <Icon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: arch.color }}
                  />
                  <span
                    className={`text-sm flex-1 ${
                      isCompleted
                        ? "text-text-primary font-medium"
                        : isExplored
                        ? "text-text-secondary"
                        : "text-text-tertiary"
                    }`}
                  >
                    {arch.name}
                  </span>
                  <Badge
                    variant={isCompleted ? "success" : "outline"}
                    className="text-xs"
                  >
                    {arch.difficulty}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

