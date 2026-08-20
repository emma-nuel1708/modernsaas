"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Folder, Users } from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/dashboard/projects", icon: Folder },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
        <Link href="/" className="text-xl font-bold text-blue-600">
          ModernSaaS
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto pt-5 pb-4">
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
      </div>
    </div>
  );
};
