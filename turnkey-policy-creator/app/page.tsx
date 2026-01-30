import { PolicyBuilder } from "@/components/PolicyBuilder";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Turnkey Policy Creator
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Build and export policies for your Turnkey organization
              </p>
            </div>
            <a
              href="https://docs.turnkey.com/concepts/policies/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto"
            >
              Documentation
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8 flex-1">
        <PolicyBuilder />
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/70 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            This tool generates Turnkey policy JSON. Always review policies
            before deploying to production.
          </p>
        </div>
      </footer>
    </main>
  );
}
