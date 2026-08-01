"use client";

import { CheckCircle2, Shield, Zap, MessageCircle } from "lucide-react";

const features = [
  {
    icon: CheckCircle2,
    title: "Verified Listings",
    description:
      "All properties are verified and inspected by our team to ensure quality and authenticity.",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Shield,
    title: "Trusted Landlords",
    description:
      "Rent from verified landlords with proven track records and excellent ratings.",
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    icon: Zap,
    title: "Secure Rental Process",
    description:
      "Protected transactions and transparent agreements for peace of mind.",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: MessageCircle,
    title: "Fast Communication",
    description:
      "Quick response times and direct messaging with landlords and property managers.",
    iconColor: "text-violet-600",
    bgColor: "bg-violet-100",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose RentNest?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re committed to making your rental experience seamless and
            trustworthy.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-8 hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`mb-4 inline-flex p-3 rounded-lg ${feature.bgColor}`}
                >
                  <Icon className={`w-6 h-6  ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
