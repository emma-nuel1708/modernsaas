"use client";

import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function BillingContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const handleUpgrade = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error creating checkout session: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Failed to start checkout. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-500 mt-1">Manage your plan and billing details.</p>
      </div>

      {/* Success / Cancel Banners */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">🎉 Payment successful! Your Pro plan is now active. You can monitor up to 20 websites!</p>
        </div>
      )}
      {canceled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 font-medium">Payment was canceled. You can try again anytime.</p>
        </div>
      )}

      {/* Current Plan Info */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Current Plan: <span className="font-bold text-blue-600">Free Tier</span></h3>
          <p className="text-sm text-gray-500 mt-1">You are currently monitoring 1 out of 1 available websites.</p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        
        {/* Free Plan */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Free</h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
            </p>
            <p className="mt-4 text-sm text-gray-500">Perfect for trying out the platform.</p>
          </div>
          <div className="flex-1 p-6 bg-gray-50 flex flex-col justify-between">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700">Monitor 1 Website</span>
              </li>
              <li className="flex items-start">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700">1 Hour checks</span>
              </li>
              <li className="flex items-start">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700">Email Alerts</span>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="w-full" variant="outline" disabled>
                Current Plan
              </Button>
            </div>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-lg border-2 border-blue-600 shadow-lg flex flex-col relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
               Most Popular
             </span>
          </div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Pro</h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-4xl font-extrabold text-gray-900">$15</span>
              <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
            </p>
            <p className="mt-4 text-sm text-gray-500">For freelancers and small businesses.</p>
          </div>
          <div className="flex-1 p-6 bg-gray-50 flex flex-col justify-between rounded-b-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 font-medium">Monitor up to 20 Websites</span>
              </li>
              <li className="flex items-start">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700 font-medium">1 Minute checks</span>
              </li>
              <li className="flex items-start">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700">SMS & Slack Alerts</span>
              </li>
              <li className="flex items-start">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                <span className="ml-3 text-sm text-gray-700">Invite Team Members</span>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="w-full" onClick={handleUpgrade} isLoading={isLoading}>
                Upgrade to Pro
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
    <Suspense fallback={
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    }>
      <BillingContent />
    </Suspense>
  );
}
