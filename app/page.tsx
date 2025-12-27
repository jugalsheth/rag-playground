import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Zap, GitCompare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-background-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Learn RAG Through Experience
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Interactive visualizations make complex concepts easy to understand
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Eye,
                title: "Visual Learning",
                description:
                  "See data flow in real-time through animated flowcharts. Watch how each architecture processes queries differently.",
                color: "text-blue-400",
              },
              {
                icon: Zap,
                title: "Instant Demos",
                description:
                  "Try each architecture immediately with interactive demos. No setup, no configuration—just click and learn.",
                color: "text-purple-400",
              },
              {
                icon: GitCompare,
                title: "Compare & Learn",
                description:
                  "Understand differences at a glance. See which architecture works best for your use case.",
                color: "text-green-400",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon
                    className={`w-12 h-12 mx-auto mb-4 ${feature.color}`}
                  />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background-darker">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Start with Naive RAG and work your way up to Agentic RAG. Each
            architecture builds on the previous one.
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors glow-effect"
          >
            Start Exploring →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-secondary">
            Built with ❤️ to help AI learners worldwide
          </p>
          <p className="text-text-tertiary text-sm mt-2">
            Made to make RAG architectures accessible to everyone
          </p>
        </div>
      </footer>
    </main>
  );
}

