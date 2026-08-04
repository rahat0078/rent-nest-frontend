"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bed, Bath, Ruler, Check, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CreateRentalRequest } from "@/app/(dashboard)/dashboard/tenant/_tenantActions/createRentals";

interface PropertySummaryCardProps {
  propertyId: string;
  rentAmount: number;
  isAvailable: boolean;
  category: string;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
}

export function PropertySummaryCard({
  propertyId,
  rentAmount,
  isAvailable,
  category,
  sizeSqFt,
  bedrooms,
  bathrooms,
}: PropertySummaryCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestSubmit = async () => {
    if (!moveInDate) {
      toast.error("Please select a move-in date.");
      return;
    }

    const selectedDate = new Date(moveInDate);
    if (selectedDate <= new Date()) {
      toast.error("Move-in date must be in the future.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await CreateRentalRequest({
        propertyId,
        moveInDate: selectedDate,
        message: message.trim() || undefined,
      });

      if (response?.success) {
        toast.success("Rental request submitted successfully!");
        setIsFormOpen(false); // Close the form on success
        setMoveInDate("");
        setMessage("");
      } else {
        toast.error(response?.message || "Failed to submit request.");
        setMoveInDate("");
        setMessage("");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6 sticky top-24">
      {/* Price */}
      <div>
        <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
        <p className="text-3xl font-bold text-primary">
          ${rentAmount.toLocaleString()}
        </p>
      </div>

      {/* Status and Category */}
      <div className="flex items-center gap-2">
        {isAvailable ? (
          <Badge className="flex items-center gap-1 bg-green-100 text-green-700">
            <Check className="w-3 h-3" />
            Available
          </Badge>
        ) : (
          <Badge variant="destructive">Rented</Badge>
        )}
        <Badge variant="secondary">{category}</Badge>
      </div>

      {/* Property Details */}
      <div className="space-y-3 border-t border-b border-border py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Size</span>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">
              {sizeSqFt} sq ft
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Bedrooms</span>
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{bedrooms}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Bathrooms</span>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{bathrooms}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons & Dropdown Form */}
      <div className="space-y-4">
        {isAvailable ? (
          <Button 
            className="w-full transition-all" 
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? "Cancel Request" : "Request Rental"}
          </Button>
        ) : (
          <Button className="w-full" disabled>
            Not Available
          </Button>
        )}

        {/* Collapsible Form Section */}
        {isFormOpen && (
          <div className="p-4 bg-muted/40 rounded-lg border border-border space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Move-in Date <span className="text-destructive">*</span>
              </label>
              <Input
                type="date"
                min={new Date().toISOString().split("T")[0]} // Prevent past dates in UI
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Message (Optional)
              </label>
              <Textarea
                placeholder="Introduce yourself or ask a question..."
                className="resize-none"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleRequestSubmit} 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Submit Request
            </Button>
          </div>
        )}

        <Button disabled variant="outline" className="w-full flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Save Property
        </Button>
      </div>
    </div>
  );
}