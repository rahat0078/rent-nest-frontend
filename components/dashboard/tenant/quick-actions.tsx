import Link from 'next/link'
import { LucideIcon, Search, FileText, CreditCard, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ActionCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

function ActionCard({ icon: Icon, title, description, href }: ActionCardProps) {
  return (
    <Link href={href}>
      <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full">
        <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="ghost" className="mt-4 h-auto p-0 text-primary">
          Go to {title} →
        </Button>
      </div>
    </Link>
  )
}

export default function QuickActions() {
  const actions = [
    {
      icon: Search,
      title: 'Browse Properties',
      description: 'Explore available rental properties',
      href: '/properties',
    },
    {
      icon: FileText,
      title: 'View Requests',
      description: 'Manage your rental requests',
      href: '/dashboard/tenant/requests',
    },
    {
      icon: CreditCard,
      title: 'Payment History',
      description: 'View all transactions',
      href: '/dashboard/tenant/payments',
    },
    {
      icon: Star,
      title: 'Leave Review',
      description: 'Share your rental experience',
      href: '/dashboard/tenant/reviews',
    },
  ]

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <ActionCard key={action.title} {...action} />
        ))}
      </div>
    </div>
  )
}
