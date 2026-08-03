import { Badge } from '@/components/ui/badge'

type RentalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'

interface StatusBadgeProps {
  status: RentalStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<RentalStatus, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
    PENDING: { variant: 'outline', label: 'Pending' },
    APPROVED: { variant: 'default', label: 'Approved' },
    REJECTED: { variant: 'destructive', label: 'Rejected' },
    ACTIVE: { variant: 'secondary', label: 'Active' },
    COMPLETED: { variant: 'outline', label: 'Completed' },
  }

  const config = statusConfig[status]

  return <Badge variant={config.variant}>{config.label}</Badge>
}
