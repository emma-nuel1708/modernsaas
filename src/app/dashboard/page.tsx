"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Shield, UserPlus, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  createTeamInvite,
  getTeamInvitesForOwner,
  deleteTeamInvite,
  TeamInvite,
} from "@/lib/firebase/firestore";

export default function TeamPage() {
  const { user } = useAuth();
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamInvite["role"]>("Editor");
  const [isSending, setIsSending] = useState(false);

  const loadInvites = useCallback(async () => {
    if (!user) return;
    const data = await getTeamInvitesForOwner(user.uid);
    setInvites(data);
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) loadInvites();
  }, [user, loadInvites]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !email) return;
    setIsSending(true);
    try {
      await createTeamInvite(user.uid, email, role);
      setEmail("");
      await loadInvites();
    } finally {
      setIsSending(false);
    }
  };

  const handleRemoveInvite = async (id: string) => {
    await deleteTeamInvite(id);
    await loadInvites();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Team Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage who has access to your workspace.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />{" "}
          Invite Team Member
        </h2>
        <form className="flex gap-4 items-end" onSubmit={handleInvite}>
          <div className="flex-1">
            <Input
              label="Email Address"
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as TeamInvite["role"])}
              className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
          <Button type="submit" isLoading={isSending}>
            Send Invite
          </Button>
        </form>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          Invites are saved to your workspace. Email delivery isn&apos;t
          connected yet — the invited person won&apos;t be notified
          automatically.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 font-bold">
                      {user?.email?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.displayName || "You"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                  <Shield className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                  Owner
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                  Active
                </span>
              </td>
              <td />
            </tr>
            {invites.map((invite) => (
              <tr key={invite.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {invite.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {invite.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleRemoveInvite(invite.id)}
                    className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 active:scale-90 transition-transform"
                    title="Cancel invite"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
