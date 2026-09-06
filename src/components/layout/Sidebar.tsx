"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  getUserProfile,
  getMonitorsForUser,
  UserProfile,
} from "@/lib/firebase/firestore";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Activity, Users, CreditCard } from "lucide-react";

const MotionLink = motion(Link);

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [monitorCount, setMonitorCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.uid).then(setProfile);
    getMonitorsForUser(user.uid).then((m) => setMonitorCount(m.length));
  }, [user]);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Monitors", href: "/dashboard/monitors", icon: Activity },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const plan = profile?.plan ?? "free";
  const limit = profile?.monitorLimit ?? 1;

  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0">
      <div className="flex items-center h-16 shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto pt-5 pb-4 flex flex-col justify-between">
        <nav className="mt-5 px-2 space-y-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <MotionLink
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.96 }}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`mr-3 shrink-0 h-5 w-5 ${
                    isActive
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </MotionLink>
            );
          })}
        </nav>

        <div className="px-4 pb-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              {plan === "pro" ? "Pro Plan" : "Free Plan"}
            </h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {monitorCount} of {limit} monitors used.
            </p>
            {plan !== "pro" && (
              <Link
                href="/dashboard/billing"
                className="mt-3 block text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 active:text-blue-700 dark:active:text-blue-200"
              >
                Upgrade to Pro &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
