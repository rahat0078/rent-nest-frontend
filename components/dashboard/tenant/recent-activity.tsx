import { CheckCircle2, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  property: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export default function RecentActivity({
  activities = [
    {
      id: "1",
      title: "Rental Request Submitted",
      timestamp: "2 hours ago",
      completed: true,
      property: "Modern Downtown Apartment",
    },
    {
      id: "2",
      title: "Request Approved",
      timestamp: "1 hour ago",
      completed: true,
      property: "Modern Downtown Apartment",
    },
    {
      id: "3",
      title: "Payment Completed",
      timestamp: "30 minutes ago",
      completed: true,
      property: "Modern Downtown Apartment",
    },
    {
      id: "4",
      title: "Rental Activated",
      timestamp: "Just now",
      completed: true,
      property: "Modern Downtown Apartment",
    },
  ],
}: RecentActivityProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Recent Activity
      </h2>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  activity.completed
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-blue-100 dark:bg-blue-900/30"
                }`}
              >
                {activity.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 h-12 bg-border my-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <p className="font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {activity.property}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
