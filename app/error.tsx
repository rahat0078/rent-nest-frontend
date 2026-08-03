"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log runtime error to an error reporting service
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Illustration Badge */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
          <AlertOctagon className="h-12 w-12 text-destructive" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Something Went Wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected error occurred while processing your request. We
            have been notified and are looking into it.
          </p>
        </div>

        {/* Error Code / Digest snippet if available */}
        {error?.digest && (
          <div className="bg-muted/50 border border-border rounded-md p-2 max-w-xs mx-auto">
            <p className="text-[11px] font-mono text-muted-foreground truncate">
              Digest: {error.digest}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => reset()}
            className="w-full sm:w-auto text-xs gap-1.5 h-9"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Try Again
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto text-xs gap-1.5 h-9 "
          >
            <Link href="/" className="flex justify-center items-center">
              <Home className="h-3.5 w-3.5" />
              Go to Home
            </Link>
          </Button>
        </div>

        {/* Footer Details */}
        <p className="text-[11px] text-muted-foreground/70 font-mono">
          If the issue persists, please contact support.
        </p>
      </div>
    </div>
  );
}