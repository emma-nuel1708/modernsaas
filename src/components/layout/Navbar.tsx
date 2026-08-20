"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/Button";

export const Navbar = () => {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              ModernSaaS
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost">Dashboard</Button>
                    </Link>
                    <Button variant="outline" onClick={logout}>Log out</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost">Log in</Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="primary">Sign up</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
