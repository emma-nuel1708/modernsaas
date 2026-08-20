"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getProjectsForUser, createProject, deleteProject, Project } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2, Layout } from "lucide-react";

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      if (user) {
        const data = await getProjectsForUser(user.uid);
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newProjectName) return;

    try {
      setIsCreating(true);
      await createProject(newProjectName, newProjectDesc, user.uid);
      setNewProjectName("");
      setNewProjectDesc("");
      await loadProjects(); // Reload list
    } catch (error) {
      console.error("Failed to create project", error);
      alert("Error creating project. Ensure Firestore is setup and rules allow writes.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        await loadProjects();
      } catch (error) {
        console.error("Failed to delete project", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="text-gray-500 mt-1">Manage all your workspaces and projects.</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-600" /> Create New Project
        </h2>
        <form onSubmit={handleCreateProject} className="flex gap-4 items-end">
          <div className="flex-1">
            <Input 
              label="Project Name" 
              placeholder="e.g. Acme Corp Redesign" 
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <Input 
              label="Description (Optional)" 
              placeholder="A brief description..." 
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
            />
          </div>
          <Button type="submit" isLoading={isCreating} disabled={!newProjectName}>
            Create
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Projects</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
            <Layout className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new project above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
                <h3 className="font-bold text-gray-900 truncate pr-8">{project.name}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                  {project.description || "No description provided."}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    ID: {project.id.slice(0, 8)}...
                  </span>
                  <button 
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete project"
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
