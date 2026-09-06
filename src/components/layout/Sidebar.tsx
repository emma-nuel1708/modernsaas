"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Activity, Users, CreditCard } from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Monitors", href: "/dashboard/monitors", icon: Activity },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
        <Link href="/" className="text-xl font-bold text-blue-600">
          UptimeHero
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto pt-5 pb-4 flex flex-col justify-between">
        <nav className="mt-5 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Free Plan</h4>
            <p className="mt-1 text-xs text-gray-500">1 of 1 monitors used.</p>
            <Link href="/dashboard/billing" className="mt-3 block text-xs font-medium text-blue-600 hover:text-blue-500">
              Upgrade to Pro &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
