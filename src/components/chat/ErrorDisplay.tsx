"use client";

import { AlertCircle, X } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  onDismiss: () => void;
}

export function ErrorDisplay({ error, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-4 animate-slide-down">
      <div className="glass-sm bg-gradient-to-r from-red-500/15 to-red-500/5 border-red-500/30 rounded-lg p-3 flex items-center justify-between shadow-lg shadow-red-500/10 hover:shadow-red-500/20 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-red-500/40 to-red-400/20 border border-red-400/40 rounded-md flex items-center justify-center flex-shrink-0 glow-red">
            <AlertCircle className="text-red-300" size={12} />
          </div>
          <span className="text-red-200 text-sm font-medium">{error}</span>
        </div>

        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-200 transition-all duration-300 p-1 hover:bg-red-500/20 rounded-lg border border-transparent hover:border-red-400/40 active:scale-90"
          title="Dismiss error"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}