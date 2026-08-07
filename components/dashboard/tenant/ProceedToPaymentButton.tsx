"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPayment } from "@/app/(dashboard)/dashboard/tenant/_tenantActions/createPayment";

interface ProceedToPaymentButtonProps {
  rentRequestId: string;
  status: string;
}

export function ProceedToPaymentButton({
  rentRequestId,
  status,
}: ProceedToPaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  // Business Rule: Render button ONLY when request status === "APPROVED"
  if (status !== "APPROVED") {
    return null;
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await createPayment(rentRequestId);

      if (res.success && res.data?.checkoutUrl) {
        toast.success("Redirecting to checkout...");
        // Immediate redirect to Stripe Checkout
        window.location.href = res.data.checkoutUrl;
      } else {
        toast.error(res.message || "Failed to create payment session.");
        setLoading(false);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed To Payment
        </>
      )}
    </Button>
  );
}