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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
        <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Projects
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Desktop Create Button */}
            <button
              onClick={onCreateProject}
              disabled={loading}
              className="hidden md:flex bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:from-[#3b78e7] hover:to-[#2d9249] disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-5 py-2.5 rounded-xl items-center gap-2 transition-all duration-200 font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:hover:shadow-none disabled:hover:translate-y-0 cursor-pointer active:scale-95"
            >
              <Plus size={18} />
              Create new
            </button>
          </div>

          {/* Controls Row */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                disabled={loading}
                className="glass-input w-full pl-11 pr-4 py-3 text-white text-sm disabled:opacity-50"
              />
            </div>

            {/* View Toggle - Desktop only */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/10"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/10"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-4 md:px-6 lg:px-8 pt-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-slide-up">
            <span className="text-red-300 text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 md:px-6 lg:px-8 py-6 pb-24 md:pb-8">
        {projects.length === 0 ? (
          <div className="text-center py-16 md:py-24 animate-slide-up">
            {searchQuery ? (
              // No search results
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-emerald-500/10 border border-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Search size={28} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-500 mb-6 text-sm">
                  Try adjusting your search terms
                </p>
                <button
                  onClick={() => onSearchChange("")}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              // No projects at all
              <div className="max-w-sm mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-emerald-500/10 border border-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Plus size={36} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Create your first project
                </h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  Projects help you organize your documents and conversations.
                </p>
                <button
                  onClick={onCreateProject}
                  className="bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:from-[#3b78e7] hover:to-[#2d9249] text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  Create your first project
                </button>
              </div>
            )}
          </div>
        ) : (
          // Projects Grid/List
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Recent projects
            </h2>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => onProjectClick(project.id)}
                    className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 relative overflow-hidden animate-slide-up tap-highlight"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    {/* Project Icon */}
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500/20 to-emerald-500/10 border border-white/10 rounded-xl mb-4 flex items-center justify-center">
                      <Folder size={22} className="text-blue-300" />
                    </div>

                    {/* Project Info */}
                    <div className="space-y-1.5">
                      <h3 className="font-semibold text-white text-base line-clamp-2 group-hover:text-blue-100 transition-colors">
                        {project.name}
                      </h3>

                      {project.description && (
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}

                      <div className="pt-2">
                        <span className="text-xs text-gray-600">
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
                      className="absolute top-3 right-3 p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer border border-transparent hover:border-red-500/20"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => onProjectClick(project.id)}
                    className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/5 animate-slide-up tap-highlight"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-emerald-500/10 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Folder size={20} className="text-blue-300" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate group-hover:text-blue-100 transition-colors">
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-gray-500 text-sm truncate mt-0.5">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Date */}
                    <div className="text-xs text-gray-600 flex-shrink-0">
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(project.id);
                      }}
                      className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer border border-transparent hover:border-red-500/20"
                      title="Delete project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile FAB */}
      <button
        onClick={onCreateProject}
        disabled={loading}
        className="md:hidden fab"
        aria-label="Create new project"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}