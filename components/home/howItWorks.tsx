"use client";

import { Search, Send, Home, CreditCard } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    color: {
      bg: "bg-blue-100",
      border: "border-blue-600",
      icon: "text-blue-600",
      badge: "text-blue-600 border-blue-600",
    },
    title: "Browse Properties",
    description:
      "Explore our curated collection of verified rental properties with detailed information and photos.",
  },
  {
    number: "02",
    icon: Send,
    color: {
      bg: "bg-emerald-100",
      border: "border-emerald-600",
      icon: "text-emerald-600",
      badge: "text-emerald-600 border-emerald-600",
    },
    title: "Send Rental Request",
    description:
      "Connect with landlords directly and submit your rental request with just a few clicks.",
  },
  {
    number: "03",
    icon: CreditCard,
    color: {
      bg: "bg-amber-100",
      border: "border-amber-600",
      icon: "text-amber-600",
      badge: "text-amber-600 border-amber-600",
    },
    title: "Complete Payment",
    description:
      "Pay your rent securely through our platform using your preferred payment method.",
  },
  {
    number: "04",
    icon: Home,
    color: {
      bg: "bg-violet-100",
      border: "border-violet-600",
      icon: "text-violet-600",
      badge: "text-violet-600 border-violet-600",
    },
    title: "Move Into Your New Home",
    description:
      "Complete the process and start your new chapter in your dream rental property.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-32 lg:px-8 bg-primary/5">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding your perfect home is just three simple steps away.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-1/5 right-1/5 h-1 bg-linear-to-r from-primary/20 via-primary/50 to-primary/20" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="relative py-6 px-4 rounded-xl border border-border bg-card text-center h-full flex flex-col">
                  {/* Step Number Badge */}
                  <div className="mb-6 mx-auto">
                    <div
                      className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 ${step.color.bg} ${step.color.border}`}
                    >
                      <Icon className={`h-8 w-8 ${step.color.icon}`} />

                      <span
                        className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background text-xs font-bold ${step.color.badge}`}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed grow">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
