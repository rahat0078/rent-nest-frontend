"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-lg space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-amber-600 dark:text-amber-500" />
          </div>

          <h2 className="text-2xl font-bold text-foreground">
            Payment Cancelled
          </h2>

          <p className="text-sm text-muted-foreground">
            You have cancelled the checkout process. No charges were made to your account. You can retry the payment whenever you are ready.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push("/dashboard/tenant/requests")}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Requests
          </Button>

          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={() => router.push("/dashboard/tenant/requests")}
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}