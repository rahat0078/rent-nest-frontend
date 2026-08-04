"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-background to-primary/5 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-foreground sm:text-6xl leading-tight">
                Find Your Perfect <span className="text-primary">Home</span>{" "}
                Today
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Discover premium rental properties verified by our trusted
                landlords. Browse, request, and move in with confidence.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={"/properties"}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-primary">1200+</p>
                <p className="text-sm text-muted-foreground">Properties</p>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-primary">800+</p>
                <p className="text-sm text-muted-foreground">Happy Tenants</p>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-primary">150+</p>
                <p className="text-sm text-muted-foreground">
                  Trusted Landlords
                </p>
              </div>
            </div>
          </div>

          {/* Right - Image Placeholder */}
          <div className="relative h-96 min-h-96 lg:h-full">
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/15 via-background to-accent/15 shadow-2xl">
              {/* Background Glow */}
              <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

              {/* Image */}
              <div className="relative h-full w-full">
                <Image
                  src="/hero.jpg"
                  alt="Premium Rental Property"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-background/50 via-background/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 backdrop-blur">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium">
                      500+ Verified Properties
                    </span>
                  </div>

                  <h3 className="mt-4 text-3xl font-bold text-foreground">
                    Find Your Perfect Home
                  </h3>

                  <p className="mt-2 max-w-md">
                    Discover premium rental properties with verified landlords,
                    transparent pricing, and a seamless booking experience.
                  </p>
                </div>

                {/* Floating Card */}
                <div className="absolute top-6 right-6 rounded-2xl border border-border bg-background/90 p-4 shadow-xl backdrop-blur">
                  <p className="text-xs text-muted-foreground">Starting From</p>
                  <h4 className="text-2xl font-bold text-primary"> $850/mo</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
