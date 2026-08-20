"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Folder, Users, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  const stats = [
    { name: "Active Projects", value: "3", icon: Folder, change: "+2 this week" },
    { name: "Team Members", value: "1", icon: Users, change: "Just you" },
    { name: "API Calls", value: "842", icon: Activity, change: "+14% from last week" },
    { name: "Revenue", value: "$0.00", icon: TrendingUp, change: "Free tier" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.displayName || "Creator"}!
          </h1>
          <p className="text-gray-500 mt-1">Here is what is happening with your projects today.</p>
        </div>
        <Link href="/dashboard/projects">
          <Button>View Projects</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {item.change}
                  </div>
                </div>
              </dd>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6 text-center text-gray-500">
          No recent activity to show yet. Create a project to get started!
        </div>
      </div>
    </div>
  );
}
