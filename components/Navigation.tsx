"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Sparkles className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold gradient-text">RAG Playground</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <Link
              href="/"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/playground"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Playground
            </Link>
          </div>

          <Link href="/playground">
            <Button variant="default" size="sm">
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

