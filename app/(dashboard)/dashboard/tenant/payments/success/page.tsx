"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/app/(dashboard)/dashboard/tenant/_tenantActions/confirmPayment";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  // Derive initial state based on sessionId presence to avoid synchronous setState inside useEffect
  const [loading, setLoading] = useState<boolean>(!!sessionId);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    sessionId ? "" : "Invalid payment session ID."
  );

  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (!sessionId || hasConfirmed.current) return;
    hasConfirmed.current = true;

    const verifyPayment = async () => {
      try {
        const res = await confirmPayment(sessionId);

        if (res?.success) {
          setSuccess(true);
        } else {
          setErrorMessage(res?.message || "Payment verification failed.");
        }
      } catch (error: unknown) {
        const msg =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        setErrorMessage(msg);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-lg space-y-6">
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Verifying Payment...</h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we confirm your transaction and update your rental request.
            </p>
          </div>
        )}

        {!loading && success && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
            <p className="text-sm text-muted-foreground">
              Your payment has been processed, your rental request is now active, and the property is booked.
            </p>
            <div className="pt-4 w-full">
              <Button
                className="w-full"
                onClick={() => router.push("/dashboard/tenant/requests")}
              >
                Go to Rental Requests
              </Button>
            </div>
          </div>
        )}

        {!loading && !success && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center">
              <XCircle className="h-10 w-10 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Payment Verification Failed</h2>
            <p className="text-sm text-muted-foreground">
              {errorMessage || "We couldn't confirm your payment. Please try again or contact support."}
            </p>
            <div className="pt-4 flex gap-3 w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/dashboard/tenant/requests")}
              >
                Back to Requests
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}