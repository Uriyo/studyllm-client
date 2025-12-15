"use client";

import { Plus, Search, Grid3X3, List, Folder, Trash2 } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectsGridProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  viewMode: "grid" | "list";
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onProjectClick: (projectId: string) => void;
  onCreateProject: () => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectsGrid({
  projects,
  loading,
  error,
  searchQuery,
  viewMode,
  onSearchChange,
  onViewModeChange,
  onProjectClick,
  onCreateProject,
  onDeleteProject,
}: ProjectsGridProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">
      {/* Header */}
      <div className="glass-lg border-b border-white/10 bg-gradient-to-r from-white/5 via-blue-500/5 to-transparent backdrop-blur-2xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-emerald-200 tracking-tight">
                Projects
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={onCreateProject}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 disabled:hover:shadow-none disabled:hover:translate-y-0 cursor-pointer active:scale-95"
            >
              <Plus size={16} />
              Create new
            </button>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400/50"
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                disabled={loading}
                className="glass-input w-full pl-10 pr-4 py-2.5 text-white text-sm disabled:opacity-50"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="glass-sm bg-white/5 border-white/10 rounded-lg p-1 flex items-center gap-0.5">
                <button
                  onClick={() => onViewModeChange("grid")}
                  className={`p-1.5 rounded transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-blue-500/30 text-blue-200 border border-blue-400/30 glow-blue"
                      : "text-gray-400 hover:text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => onViewModeChange("list")}
                  className={`p-1.5 rounded transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 glow-emerald"
                      : "text-gray-400 hover:text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="glass-sm bg-red-500/10 border-red-500/30 rounded-xl p-4 animate-slide-up">
            <span className="text-red-300 text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {projects.length === 0 ? (
          <div className="text-center py-20 animate-slide-up">
            {searchQuery ? (
              // No search results
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-emerald-500/20 border border-blue-400/40 rounded-full mx-auto mb-6 flex items-center justify-center glow-blue">
                  <Search size={24} className="text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  No projects found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or create a new project
                </p>
                <button
                  onClick={() => onSearchChange("")}
                  className="text-blue-300 hover:text-blue-200 text-sm font-medium underline underline-offset-4 transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              // No projects at all
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-emerald-500/20 border border-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center glow-blue hover-glow-blue">
                  <Plus size={32} className="text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-emerald-200 mb-3">
                  Create your first project
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Projects help you organize your documents and conversations.
                  Start by creating your first project.
                </p>
                <button
                  onClick={onCreateProject}
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-6 py-3 rounded-full transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  Create your first project
                </button>
              </div>
            )}
          </div>
        ) : (
          // Projects Grid/List
          <div className="space-y-6">
            {/* Recent Projects Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-4">
                Recent projects
              </h2>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => onProjectClick(project.id)}
                      className="group glass-lg border-white/10 hover:border-blue-400/50 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 relative overflow-hidden animate-slide-up hover:bg-blue-500/10"
                    >
                      {/* Glow Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
                      </div>

                      {/* Project Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/40 to-emerald-500/20 border border-blue-400/40 rounded-xl mb-4 flex items-center justify-center shadow-lg glow-blue group-hover:shadow-xl transition-all duration-300 relative z-10">
                        <Folder size={24} className="text-blue-300" />
                      </div>

                      {/* Project Info */}
                      <div className="space-y-2 relative z-10">
                        <h3 className="font-semibold text-white text-base line-clamp-2 group-hover:text-blue-100 transition-colors">
                          {project.name}
                        </h3>

                        {project.description && (
                          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed group-hover:text-gray-300 transition-colors">
                            {project.description}
                          </p>
                        )}

                        <div className="pt-2">
                          <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            {new Date(project.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject(project.id);
                        }}
                        className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110 active:scale-95 relative z-20 border border-transparent hover:border-red-500/30"
                        title="Delete project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                // List View
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => onProjectClick(project.id)}
                      className="group glass-sm border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 flex items-center gap-4 p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/15 hover:translate-x-1 animate-slide-up"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/40 to-emerald-500/20 border border-blue-400/40 rounded-lg flex items-center justify-center flex-shrink-0 glow-blue">
                        <Folder size={20} className="text-blue-300" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate group-hover:text-blue-100 transition-colors">
                          {project.name}
                        </h3>
                        {project.description && (
                          <p className="text-gray-400 text-sm truncate mt-1 group-hover:text-gray-300 transition-colors">
                            {project.description}
                          </p>
                        )}
                      </div>

                      {/* Date */}
                      <div className="text-xs text-gray-500 flex-shrink-0 self-start group-hover:text-gray-400 transition-colors">
                        {new Date(project.created_at).toLocaleDateString()}
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject(project.id);
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110 active:scale-95 border border-transparent hover:border-red-500/30"
                        title="Delete project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}