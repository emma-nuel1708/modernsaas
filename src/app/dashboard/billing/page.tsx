"use client";

import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  getUserProfile,
  getMonitorsForUser,
  UserProfile,
} from "@/lib/firebase/firestore";

function BillingContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [monitorCount, setMonitorCount] = useState(0);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.uid).then(setProfile);
    getMonitorsForUser(user.uid).then((m) => setMonitorCount(m.length));
  }, [user, success]);

  const isPro = profile?.plan === "pro";

  const handleUpgrade = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, userEmail: user.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Billing & Subscription
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your plan and billing details.
        </p>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-300 font-medium">
            🎉 Payment successful! Your Pro plan will activate shortly once
            billing confirms.
          </p>
        </div>
      )}
      {canceled && (
        <div className="bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-300 font-medium">
            Payment was canceled. You can try again anytime.
          </p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Current Plan:{" "}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {isPro ? "Pro" : "Free Tier"}
            </span>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            You are currently monitoring {monitorCount} out of{" "}
            {profile?.monitorLimit ?? 1} available websites.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Free
            </h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                $0
              </span>
              <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                /mo
              </span>
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Perfect for trying out the platform.
            </p>
          </div>
          <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-800/50 flex flex-col justify-between">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Monitor 1 Website
                </span>
              </li>
              <li className="flex items-start">
                <Check className="shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  1 Hour checks
                </span>
              </li>
              <li className="flex items-start">
                <Check className="shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Email Alerts
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <Button
                className="w-full"
                variant="outline"
                disabled={!isPro ? true : false}
              >
                {isPro ? "Downgrade Unavailable" : "Current Plan"}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-600 shadow-lg flex flex-col relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
              Most Popular
            </span>
          </div>
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Pro
            </h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                $15
              </span>
              <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                /mo
              </span>
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              For freelancers and small businesses.
            </p>
          </div>
          <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-800/50 flex flex-col justify-between rounded-b-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  Monitor up to 20 Websites
                </span>
              </li>
              <li className="flex items-start">
                <Check className="shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  1 Minute checks
                </span>
              </li>
              <li className="flex items-start">
                <Check className="shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  SMS & Slack Alerts
                </span>
              </li>
              <li className="flex items-start">
                <Check className="shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Invite Team Members
                </span>
              </li>
            </ul>
            <div className="mt-8">
              <Button
                className="w-full"
                onClick={handleUpgrade}
                isLoading={isLoading}
                disabled={isPro}
              >
                {isPro ? "Current Plan" : "Upgrade to Pro"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
        </div>
      }
    >
      <BillingContent />
    </Suspense>
  );
}
