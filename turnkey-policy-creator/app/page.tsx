import { PolicyBuilder } from "@/components/PolicyBuilder";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Turnkey Policy Creator
              </h1>
              <p className="text-sm text-muted-foreground">
                Build and export policies for your Turnkey organization
              </p>
            </div>
            <a
              href="https://docs.turnkey.com/concepts/policies/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <PolicyBuilder />
      </div>

      {/* Footer */}
      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-muted-foreground text-center">
            This tool generates Turnkey policy JSON. Always review policies
            before deploying to production.
          </p>
        </div>
      </footer>
    </main>
  );
}
