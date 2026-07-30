import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: number;
}

export const Spinner = ({ className, size = 20 }: SpinnerProps) => {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-muted-foreground", className)}
    />
  );
};

export default Spinner;
