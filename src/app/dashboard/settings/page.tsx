"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  updateUserDisplayName,
  deleteUserProfile,
  getMonitorsForUser,
  deleteMonitor,
} from "@/lib/firebase/firestore";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.displayName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setSaveMessage("");
    setError("");
    try {
      await updateProfile(user, { displayName: name });
      await updateUserDisplayName(user.uid, name);
      setSaveMessage("Settings saved successfully.");
    } catch {
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (
      !confirm(
        "This will permanently delete your account and all of your monitors. This cannot be undone. Continue?",
      )
    ) {
      return;
    }
    setIsDeleting(true);
    setError("");
    try {
      const monitors = await getMonitorsForUser(user.uid);
      await Promise.all(monitors.map((m) => deleteMonitor(m.id)));
      await deleteUserProfile(user.uid);
      await deleteUser(auth.currentUser!);
      router.push("/");
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes("requires-recent-login")
      ) {
        setError(
          "For security, please log out and log back in, then try deleting your account again.",
        );
      } else {
        setError("Failed to delete account. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account preferences and details.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}
      {saveMessage && (
        <div className="rounded-md bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-900 px-3 py-2 text-sm text-green-700 dark:text-green-300">
          {saveMessage}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Profile Information
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Update your personal details here.
          </p>
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
              className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <Button type="submit" isLoading={isSaving}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-red-200 dark:border-red-900 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
            Danger Zone
          </h2>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            Irreversible actions for your account.
          </p>
        </div>
        <div className="p-6 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Delete Account
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            isLoading={isDeleting}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
