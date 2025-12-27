"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface CodeViewerProps {
  codeSnippet: {
    python: string;
    typescript: string;
  };
  className?: string;
}

export function CodeViewer({ codeSnippet, className }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("python");

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCode = activeTab === "python" ? codeSnippet.python : codeSnippet.typescript;

  return (
    <div className={cn("glass-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(currentCode)}
            className="h-8 w-8"
          >
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-lg bg-background-darker border border-border",
              !isExpanded && "max-h-64"
            )}
          >
            <pre
              className={cn(
                "p-4 overflow-x-auto text-sm font-mono",
                !isExpanded && "overflow-y-hidden"
              )}
            >
              <code className="text-text-secondary">{currentCode}</code>
            </pre>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background-darker to-transparent pointer-events-none" />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

