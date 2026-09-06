"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getMonitorsForUser, createMonitor, deleteMonitor, Monitor } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2, Globe, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function MonitorsPage() {
  const { user } = useAuth();
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user) {
      loadMonitors();
    }
  }, [user]);

  const loadMonitors = async () => {
    try {
      setLoading(true);
      if (user) {
        const data = await getMonitorsForUser(user.uid);
        setMonitors(data);
      }
    } catch (error) {
      console.error("Failed to load monitors", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newName || !newUrl) return;

    try {
      setIsCreating(true);
      // Validate URL roughly
      const urlToSave = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;
      await createMonitor(newName, urlToSave, user.uid);
      setNewName("");
      setNewUrl("");
      await loadMonitors(); 
    } catch (error) {
      console.error("Failed to create monitor", error);
      alert("Error adding monitor.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to stop monitoring this URL?")) {
      try {
        await deleteMonitor(id);
        await loadMonitors();
      } catch (error) {
        console.error("Failed to delete monitor", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Web Monitors</h1>
        <p className="text-gray-500 mt-1">Add URLs to track their uptime and performance.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" /> Add New Monitor
        </h2>
        <form onSubmit={handleCreate} className="flex gap-4 items-end">
          <div className="flex-1">
            <Input 
              label="Friendly Name" 
              placeholder="e.g. Production API" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <Input 
              label="URL to monitor" 
              placeholder="https://api.mycompany.com" 
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              required
            />
          </div>
          <Button type="submit" isLoading={isCreating} disabled={!newName || !newUrl}>
            Start Monitoring
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Monitors</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : monitors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
            <Globe className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No active monitors</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a website URL above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monitors.map((monitor) => (
              <div key={monitor.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="truncate pr-4">
                    <h3 className="font-bold text-gray-900 truncate">{monitor.name}</h3>
                    <a href={monitor.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate block">
                      {monitor.url}
                    </a>
                  </div>
                  {monitor.status === "up" && <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />}
                  {monitor.status === "down" && <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 animate-pulse" />}
                  {monitor.status === "pending" && <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium capitalize flex items-center gap-1">
                    Status: <span className={
                      monitor.status === 'up' ? 'text-green-600' : 
                      monitor.status === 'down' ? 'text-red-600' : 'text-gray-500'
                    }>{monitor.status}</span>
                  </span>
                  <button 
                    onClick={() => handleDelete(monitor.id)}
                    className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-md shadow-sm border border-gray-200"
                    title="Delete monitor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
