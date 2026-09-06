"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Activity, Globe, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  const stats = [
    { name: "Active Monitors", value: "1", icon: Globe, change: "On Free Plan" },
    { name: "Global Uptime", value: "99.9%", icon: Activity, change: "Last 30 days" },
    { name: "Checks Performed", value: "842", icon: CheckCircle2, change: "Since yesterday" },
    { name: "Active Incidents", value: "0", icon: AlertCircle, change: "All systems operational" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.displayName || "User"}!
          </h1>
          <p className="text-gray-500 mt-1">Here is the current status of your websites.</p>
        </div>
        <Link href="/dashboard/monitors">
          <Button>View Monitors</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          const isDanger = item.name === "Active Incidents" && item.value !== "0";
          return (
            <div key={item.name} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <dt>
                <div className={`absolute rounded-md p-3 ${isDanger ? "bg-red-500" : "bg-blue-500"}`}>
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className={`text-2xl font-semibold ${isDanger ? "text-red-600" : "text-gray-900"}`}>{item.value}</p>
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
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Incidents</h3>
        </div>
        <div className="p-6 text-center text-gray-500">
          No recent downtime detected! Your websites are running smoothly.
        </div>
      </div>
    </div>
  );
}
