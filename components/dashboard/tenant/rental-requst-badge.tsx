'use client'

interface RentalStatusBadgeProps {
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'
}

export function RentalStatusBadge({ status }: RentalStatusBadgeProps) {
  const statusConfig = {
    PENDING: {
      label: 'Pending',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      dotColor: 'bg-yellow-500',
    },
    APPROVED: {
      label: 'Approved',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      dotColor: 'bg-blue-500',
    },
    REJECTED: {
      label: 'Rejected',
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      dotColor: 'bg-red-500',
    },
    ACTIVE: {
      label: 'Active',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      dotColor: 'bg-green-500',
    },
    COMPLETED: {
      label: 'Completed',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      dotColor: 'bg-gray-500',
    },
  }

  const config = statusConfig[status]

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor}`}>
      <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
      <span className={`text-sm font-medium ${config.textColor}`}>{config.label}</span>
    </div>
  )
}
