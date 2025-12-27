"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ProgressData {
  explored: string[];
  completed: string[];
  lastVisited: string | null;
}

interface ProgressContextType {
  progress: ProgressData;
  updateProgress: (architectureId: string, action: "explored" | "completed") => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = "rag-learning-progress";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>({
    explored: [],
    completed: [],
    lastVisited: null,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error("Failed to load progress from localStorage", e);
      }
    }
  }, []);

  // Update progress function
  const updateProgress = (architectureId: string, action: "explored" | "completed") => {
    setProgress((prev) => {
      const newProgress: ProgressData = {
        ...prev,
        explored: prev.explored.includes(architectureId)
          ? prev.explored
          : [...prev.explored, architectureId],
        completed:
          action === "completed"
            ? prev.completed.includes(architectureId)
              ? prev.completed
              : [...prev.completed, architectureId]
            : prev.completed,
        lastVisited: architectureId,
      };

      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      } catch (e) {
        console.error("Failed to save progress to localStorage", e);
      }

      return newProgress;
    });
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}

