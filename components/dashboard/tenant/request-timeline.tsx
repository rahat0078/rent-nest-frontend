"use client";

import { Check } from "lucide-react";

interface TimelineStep {
  label: string;
  completed: boolean;
  current: boolean;
}

interface RequestTimelineProps {
  currentStep: "submitted" | "approved" | "payment" | "active" | "completed";
}

export function RequestTimeline({ currentStep }: RequestTimelineProps) {
  const steps: TimelineStep[] = [
    {
      label: "Submitted",
      completed:
        currentStep === "approved" ||
        currentStep === "payment" ||
        currentStep === "active" ||
        currentStep === "completed",
      current: currentStep === "submitted",
    },
    {
      label: "Approved",
      completed:
        currentStep === "payment" ||
        currentStep === "active" ||
        currentStep === "completed",
      current: currentStep === "approved",
    },
    {
      label: "Payment",
      completed: currentStep === "active" || currentStep === "completed",
      current: currentStep === "payment",
    },
    {
      label: "Active",
      completed: currentStep === "completed",
      current: currentStep === "active",
    },
    {
      label: "Completed",
      completed: false,
      current: currentStep === "completed",
    },
  ];

  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div key={step.label} className="flex gap-4">
          {/* Timeline Dot */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step.completed
                  ? "bg-primary border-primary"
                  : step.current
                    ? "bg-background border-primary"
                    : "bg-background border-muted"
              }`}
            >
              {step.completed ? (
                <Check className="w-5 h-5 text-primary-foreground" />
              ) : step.current ? (
                <div className="w-2 h-2 bg-primary rounded-full" />
              ) : null}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-12 transition-all ${
                  step.completed ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>

          {/* Label */}
          <div className="pt-2.5">
            <p
              className={`font-semibold transition-colors ${
                step.completed || step.current
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
