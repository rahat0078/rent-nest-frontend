import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-primary/10 rounded-full">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>
      {action && (
        <Link href={action.href}>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  )
}
