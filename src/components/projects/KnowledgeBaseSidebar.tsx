"use client";

import { useDropzone } from "react-dropzone";
import {
  FileText,
  Settings,
  Plus,
  Upload,
  Globe,
  File,
  Presentation,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Info,
} from "lucide-react";
import { ProjectSettings, ProjectDocument } from "@/lib/types";
import { JSX, useState } from "react";

// Constants
const STRATEGY_OPTIONS = [
  {
    value: "basic",
    label: "Vector Search",
    description: "Semantic similarity matching",
  },
  {
    value: "hybrid",
    label: "Hybrid Search",
    description: "Semantic + keyword matching",
  },
  {
    value: "multi-query-vector",
    label: "Multi-Query Vector",
    description: "Multiple semantic queries",
  },
  {
    value: "multi-query-hybrid",
    label: "Multi-Query Hybrid",
    description: "Multiple hybrid queries",
  },
];

const RERANKING_MODELS = [
  { value: "rerank-english-v3.0", label: "rerank-english-v3.0" },
];

const EMBEDDING_MODELS = [
  { value: "text-embedding-3-large", label: "text-embedding-3-large" },
];

const AGENT_MODE_OPTIONS = [
  {
    value: "simple",
    label: "Simple RAG",
    description: "Documents-only search",
  },
  {
    value: "agentic",
    label: "Agentic RAG",
    description: "Smart tool selection with web search",
  },
];

// Utility functions
const documentUtils = {
  formatFileSize: (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  },

  formatTimeAgo: (dateString: string) => {
    const diffInHours = Math.floor(
      (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60)
    );
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays < 7
      ? `${diffInDays}d ago`
      : new Date(dateString).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
  },

  getIcon: (doc: ProjectDocument) => {
    if (doc.source_url) return <Globe size={16} className="text-blue-400" />;
    const type = doc.file_type.toLowerCase();
    if (type.includes("pdf"))
      return <FileText size={16} className="text-red-400" />;
    if (type.includes("ppt") || type.includes("presentation"))
      return <Presentation size={16} className="text-orange-400" />;
    if (type.includes("word") || type.includes("document"))
      return <File size={16} className="text-blue-400" />;
    return <FileText size={16} className="text-gray-400" />;
  },

  getDisplayName: (doc: ProjectDocument) => {
    if (!doc.source_url) return doc.filename;
    try {
      const url = new URL(doc.source_url);
      return `${url.hostname}${url.pathname}`;
    } catch {
      return doc.source_url;
    }
  },

  getSize: (doc: ProjectDocument) =>
    doc.source_url ? "Website" : documentUtils.formatFileSize(doc.file_size),

  getStatusIcon: (status: string) => {
    const icons: { [key: string]: JSX.Element } = {
      completed: <CheckCircle size={14} className="text-emerald-400" />,
      failed: <AlertCircle size={14} className="text-red-400" />,
    };
    return (
      icons[status] || (
        <Loader2 size={14} className="text-blue-400 animate-spin" />
      )
    );
  },

  getStatusText: (status: string) => {
    const texts: { [key: string]: string } = {
      uploading: "Uploading",
      queued: "Queued",
      partitioning: "Processing",
      chunking: "Chunking",
      summarising: "Summarising",
      vectorization: "Vectorizing",
      completed: "Ready",
      failed: "Failed",
    };
    return texts[status] || "Unknown";
  },
};

// Reusable Components
const SliderField = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled,
  info,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  info?: string;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-xs text-gray-400 font-medium">{label}</label>
      <span className="text-xs text-gray-200 bg-white/10 px-2 py-1 rounded-lg font-medium">
        {value}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer disabled:opacity-50 slider"
    />
    <div className="flex justify-between text-xs text-gray-600">
      <span>{min}</span>
      <span>{max}</span>
    </div>
    {info && <div className="text-xs text-gray-500">{info}</div>}
  </div>
);

// Main Component
interface KnowledgeBaseSidebarProps {
  activeTab: "documents" | "settings";
  onSetActiveTab: (tab: "documents" | "settings") => void;
  projectDocuments: ProjectDocument[];
  onDocumentUpload: (docs: File[]) => Promise<void>;
  onDocumentDelete: (docId: string) => Promise<void>;
  onOpenDocument: (docId: string) => void;
  onUrlAdd: (url: string) => Promise<void>;
  projectSettings: ProjectSettings | null;
  settingsError: string | null;
  settingsLoading: boolean;
  onUpdateSettings: (updates: Partial<ProjectSettings>) => void;
  onApplySettings: () => void;
  isMobile?: boolean;
}

export function KnowledgeBaseSidebar({
  activeTab,
  onSetActiveTab,
  projectDocuments,
  onDocumentUpload,
  onDocumentDelete,
  onOpenDocument,
  onUrlAdd,
  projectSettings,
  settingsError,
  settingsLoading,
  onUpdateSettings,
  onApplySettings,
  isMobile = false,
}: KnowledgeBaseSidebarProps) {
  const [urlInput, setUrlInput] = useState("");
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDocumentUpload,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    maxSize: 50 * 1024 * 1024,
  });

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim() || isAddingUrl) return;

    setIsAddingUrl(true);
    try {
      await onUrlAdd(urlInput.trim());
      setUrlInput("");
    } catch (error) {
      console.error("Failed to add URL:", error);
    } finally {
      setIsAddingUrl(false);
    }
  };

  const getPerformanceMetrics = () => {
    if (!projectSettings) return { totalChunks: 0, latency: 0 };

    const strategyConfig = {
      basic: { latency: 400 },
      hybrid: { latency: 600 },
      "multi-query-vector": { latency: 800 },
      "multi-query-hybrid": { latency: 1000 },
    }[projectSettings.rag_strategy] || { latency: 400 };

    const isMultiQuery = projectSettings.rag_strategy.includes("multi-query");
    const totalChunks =
      projectSettings.chunks_per_search *
      (isMultiQuery ? projectSettings.number_of_queries : 1);

    const baseLatency = strategyConfig.latency;
    const queryLatency = isMultiQuery
      ? projectSettings.number_of_queries * 200
      : 0;
    const rerankingLatency = projectSettings.reranking_enabled ? 200 : 0;

    const latency = baseLatency + queryLatency + rerankingLatency;

    return { totalChunks, latency };
  };

  const isMultiQuery = projectSettings?.rag_strategy?.includes("multi-query");
  const isHybrid = projectSettings?.rag_strategy?.includes("hybrid");
  const isEmbeddingLocked = projectDocuments.length > 0;

  return (
    <div className={`flex flex-col h-full bg-[#0f0f0f] ${isMobile ? "" : "border-l border-white/5"}`}>
      {/* Header - hide on mobile as parent handles it */}
      {!isMobile && (
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-emerald-500/10 border border-white/10 rounded-xl flex items-center justify-center">
              <FileText size={16} className="text-blue-400" />
            </div>
            <h2 className="text-base font-semibold text-white">Knowledge Base</h2>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-white/5 bg-white/[0.02]">
        {[
          {
            id: "documents",
            icon: FileText,
            label: "Documents",
            badge: projectDocuments.length,
          },
          {
            id: "settings",
            icon: Settings,
            label: "Settings",
            error: settingsError,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSetActiveTab(tab.id as "documents" | "settings")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? "border-blue-400 text-blue-400 bg-blue-500/5"
                : "border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-md ${
                  activeTab === tab.id
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                {tab.badge}
              </span>
            )}
            {tab.error && (
              <div className="w-2 h-2 bg-red-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "documents" ? (
          <div className="p-4 space-y-6">
            {/* Upload Section */}
            <section className="space-y-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Add Sources
              </h3>

              {/* File Upload */}
              <div
                {...getRootProps()}
                className={`border border-dashed rounded-xl p-5 text-center transition-all duration-200 cursor-pointer ${
                  isDragActive
                    ? "border-blue-400/50 bg-blue-500/10"
                    : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-200 font-medium">
                      {isDragActive ? "Drop files here" : "Drop files or click to upload"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOCX, PPT, MD, TXT • Max 50MB
                    </p>
                  </div>
                </div>
              </div>

              {/* URL Input */}
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-xs text-gray-600 font-medium">OR</span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div className="relative">
                  <Globe
                    size={16}
                    className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Paste website URL"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    disabled={isAddingUrl}
                    className="glass-input w-full pl-10 pr-4 py-3 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!urlInput.trim() || isAddingUrl}
                  className="w-full px-4 py-3 bg-white hover:bg-gray-100 disabled:bg-white/10 disabled:text-gray-500 text-black rounded-xl transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {isAddingUrl ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add website
                    </>
                  )}
                </button>
              </form>
            </section>

            <hr className="border-white/5" />

            {/* Documents List */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Sources
                </h3>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                  {projectDocuments.length}
                </span>
              </div>

              {projectDocuments.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <FileText size={20} className="text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-400 mb-1">No sources added</p>
                  <p className="text-xs text-gray-600">
                    Upload files or add websites
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {projectDocuments
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    .map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => onOpenDocument(doc.id)}
                        className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-3 transition-all duration-200 cursor-pointer tap-highlight"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                            {documentUtils.getIcon(doc)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                                {documentUtils.getDisplayName(doc)}
                              </h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDocumentDelete(doc.id);
                                }}
                                className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                title="Delete source"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{documentUtils.getSize(doc)}</span>
                                <span>•</span>
                                <span>{documentUtils.formatTimeAgo(doc.created_at)}</span>
                              </div>
                              {doc.processing_status &&
                                doc.processing_status !== "completed" && (
                                  <div className="flex items-center gap-1.5 text-xs">
                                    {documentUtils.getStatusIcon(doc.processing_status)}
                                    <span className="text-gray-400">
                                      {documentUtils.getStatusText(doc.processing_status)}
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {/* Status Alerts */}
            {settingsError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3">
                <Info size={16} className="text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300">{settingsError}</span>
              </div>
            )}
            {settingsLoading && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-blue-300">Applying settings...</span>
              </div>
            )}

            {projectSettings ? (
              <div className={`space-y-6 ${settingsLoading ? "opacity-50 pointer-events-none" : ""}`}>
                {/* Embedding Model */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Embedding Model
                    </h3>
                    <div
                      className="w-4 h-4 bg-amber-500/20 rounded-full flex items-center justify-center"
                      title={isEmbeddingLocked ? "Locked" : "Locks after first upload"}
                    >
                      <Info size={10} className="text-amber-400" />
                    </div>
                  </div>
                  <select
                    value={projectSettings.embedding_model}
                    onChange={(e) => onUpdateSettings({ embedding_model: e.target.value })}
                    disabled={isEmbeddingLocked || settingsLoading}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-100 disabled:opacity-50 focus:outline-none focus:border-blue-500/50"
                  >
                    {EMBEDDING_MODELS.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-amber-400/70">
                    {isEmbeddingLocked ? "Locked (documents uploaded)" : "Locks after first upload"}
                  </p>
                </section>

                <hr className="border-white/5" />

                {/* Search Strategy */}
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Search Strategy
                  </h3>
                  <div className="space-y-2">
                    {STRATEGY_OPTIONS.map((strategy) => (
                      <label
                        key={strategy.value}
                        className={`block p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          projectSettings.rag_strategy === strategy.value
                            ? "border-blue-500/30 bg-blue-500/10"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="ragStrategy"
                            value={strategy.value}
                            checked={projectSettings.rag_strategy === strategy.value}
                            onChange={(e) => onUpdateSettings({ rag_strategy: e.target.value })}
                            disabled={settingsLoading}
                            className="w-4 h-4 text-blue-500 bg-transparent border-gray-500 focus:ring-0"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-200">
                              {strategy.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {strategy.description}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>

                <hr className="border-white/5" />

                {/* Search Parameters */}
                <section className="space-y-4">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Search Parameters
                  </h3>

                  <SliderField
                    label="Chunks per Search"
                    value={projectSettings.chunks_per_search}
                    min={5}
                    max={30}
                    onChange={(e) =>
                      onUpdateSettings({ chunks_per_search: parseInt(e.target.value) })
                    }
                    disabled={settingsLoading}
                  />

                  <SliderField
                    label="Final Context Size"
                    value={projectSettings.final_context_size}
                    min={3}
                    max={10}
                    onChange={(e) =>
                      onUpdateSettings({ final_context_size: parseInt(e.target.value) })
                    }
                    disabled={settingsLoading}
                  />

                  <SliderField
                    label="Similarity Threshold"
                    value={projectSettings.similarity_threshold}
                    min={0.1}
                    max={0.9}
                    step={0.1}
                    onChange={(e) =>
                      onUpdateSettings({ similarity_threshold: parseFloat(e.target.value) })
                    }
                    disabled={settingsLoading}
                  />

                  {isMultiQuery && (
                    <div className="pt-3 border-t border-white/5">
                      <SliderField
                        label="Number of Queries"
                        value={projectSettings.number_of_queries}
                        min={3}
                        max={7}
                        onChange={(e) =>
                          onUpdateSettings({ number_of_queries: parseInt(e.target.value) })
                        }
                        disabled={settingsLoading}
                      />
                    </div>
                  )}
                </section>

                {/* Hybrid Search Weights */}
                {isHybrid && (
                  <>
                    <hr className="border-white/5" />
                    <section className="space-y-3">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Search Weights
                      </h3>
                      <SliderField
                        label="Vector Weight"
                        value={projectSettings.vector_weight}
                        min={0.1}
                        max={0.9}
                        step={0.1}
                        onChange={(e) => {
                          const vectorWeight = parseFloat(e.target.value);
                          onUpdateSettings({
                            vector_weight: vectorWeight,
                            keyword_weight: 1 - vectorWeight,
                          });
                        }}
                        disabled={settingsLoading}
                        info={`Keyword weight: ${projectSettings.keyword_weight.toFixed(1)}`}
                      />
                    </section>
                  </>
                )}

                <hr className="border-white/5" />

                {/* Reranking */}
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Reranking
                  </h3>
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <input
                      type="checkbox"
                      checked={projectSettings.reranking_enabled}
                      onChange={(e) => onUpdateSettings({ reranking_enabled: e.target.checked })}
                      disabled={settingsLoading}
                      className="w-4 h-4 text-blue-500 bg-transparent border-gray-500 rounded focus:ring-0"
                    />
                    <span className="text-sm text-gray-200 font-medium">Enable reranking</span>
                  </label>

                  {projectSettings.reranking_enabled && (
                    <div className="ml-1 mt-2 space-y-2">
                      <label className="text-xs text-gray-400">Model</label>
                      <select
                        value={projectSettings.reranking_model}
                        onChange={(e) => onUpdateSettings({ reranking_model: e.target.value })}
                        disabled={settingsLoading}
                        className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-100 disabled:opacity-50 focus:outline-none focus:border-blue-500/50"
                      >
                        {RERANKING_MODELS.map((model) => (
                          <option key={model.value} value={model.value}>
                            {model.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </section>

                <hr className="border-white/5" />

                {/* Agent Mode */}
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Agent Mode
                  </h3>
                  <div className="space-y-2">
                    {AGENT_MODE_OPTIONS.map((mode) => (
                      <label
                        key={mode.value}
                        className={`block p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          projectSettings.agent_type === mode.value
                            ? "border-blue-500/30 bg-blue-500/10"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="agentMode"
                            value={mode.value}
                            checked={projectSettings.agent_type === mode.value}
                            onChange={(e) => onUpdateSettings({ agent_type: e.target.value })}
                            disabled={settingsLoading}
                            className="w-4 h-4 text-blue-500 bg-transparent border-gray-500 focus:ring-0"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-200">{mode.label}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{mode.description}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>

                <hr className="border-white/5" />

                {/* Performance Impact */}
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Performance Impact
                  </h3>
                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-xl font-semibold text-white">
                          ~{getPerformanceMetrics().totalChunks}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Total chunks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-white">
                          ~{getPerformanceMetrics().latency}ms
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Latency</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Apply Settings Button */}
                <button
                  onClick={onApplySettings}
                  disabled={settingsLoading}
                  className="w-full bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:from-[#3b78e7] hover:to-[#2d9249] disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white py-3 px-4 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                >
                  <Settings size={16} />
                  {settingsLoading ? "Applying..." : "Apply Settings"}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin" />
                  Loading settings...
                </div>
              </div>
            )}

            <style jsx>{`
              .slider::-webkit-slider-thumb {
                appearance: none;
                height: 18px;
                width: 18px;
                background: linear-gradient(135deg, #4285f4, #34a853);
                border-radius: 50%;
                cursor: pointer;
                border: none;
                transition: all 0.2s ease;
              }
              .slider::-webkit-slider-thumb:hover {
                transform: scale(1.1);
              }
              .slider::-moz-range-thumb {
                height: 18px;
                width: 18px;
                background: linear-gradient(135deg, #4285f4, #34a853);
                border-radius: 50%;
                cursor: pointer;
                border: none;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}