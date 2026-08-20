"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and details.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
          <p className="text-sm text-gray-500 mt-1">Update your personal details here.</p>
        </div>
        
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
            />
            <Input 
              label="Email Address" 
              value={user?.email || ""}
              disabled
              className="bg-gray-50 text-gray-500"
            />
          </div>
          
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button type="submit" isLoading={isSaving}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden border-red-200">
        <div className="p-6 border-b border-gray-200 bg-red-50">
          <h2 className="text-lg font-semibold text-red-800">Danger Zone</h2>
          <p className="text-sm text-red-600 mt-1">Irreversible actions for your account.</p>
        </div>
        <div className="p-6 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Delete Account</h3>
            <p className="text-sm text-gray-500">Permanently delete your account and all associated data.</p>
          </div>
          <Button variant="danger">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
