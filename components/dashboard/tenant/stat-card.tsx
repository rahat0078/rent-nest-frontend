import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description: string;
  color: string;
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  description,
  color
}: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/5 rounded-lg">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">
        {title}
      </h3>
      <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
