import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  description: string
  trend?: {
    value: number
    positive: boolean
  }
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  description,
  trend,
}: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend.positive
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {trend.positive ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
