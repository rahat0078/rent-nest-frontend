"use client";

import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Illustration Badge */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-muted/60 border border-border flex items-center justify-center shadow-inner">
          <SearchX className="h-12 w-12 text-muted-foreground/80" />
          <span className="absolute -bottom-1 -right-1 px-2 py-0.5 text-[10px] font-mono font-bold bg-destructive/10 text-destructive border border-destructive/20 rounded-full">
            404
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto text-xs gap-1.5 h-9"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Go Back
          </Button>

          <Button size="sm" className="w-full sm:w-auto text-xs gap-1.5 h-9 ">
            <Link href="/" className="flex justify-center items-center gap-2">
              <Home className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Footer Subtle Note */}
        <p className="text-[11px] text-muted-foreground/70 font-mono">
          Error Code: 404_PAGE_NOT_FOUND
        </p>
      </div>
    </div>
  );
}