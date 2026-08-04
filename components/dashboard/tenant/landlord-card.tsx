"use client";

import { Mail, BadgeCheck, User } from "lucide-react";
import Image from "next/image";

interface LandlordCardProps {
  name: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  verified?: boolean;
}

export function LandlordCard({
  name,
  email,
  phone,
  avatar,
  verified = true,
}: LandlordCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        Landlord Information
      </h3>

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative w-20 h-20 shrink-0 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          {avatar ? (
            <Image
              unoptimized
              src={avatar}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-muted-foreground" />
          )}
          {verified && (
            <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-primary bg-background rounded-full z-10" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3 overflow-hidden">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-semibold text-foreground truncate">{name}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a
                href={`mailto:${email}`}
                className="text-sm text-primary hover:underline truncate"
              >
                {email}
              </a>
            </div>
            {phone && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Phone: {phone}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {verified && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
          <p className="text-xs font-medium text-primary">Verified Landlord</p>
        </div>
      )}
    </div>
  );
}
