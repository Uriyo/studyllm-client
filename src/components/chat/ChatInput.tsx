"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      await onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-white/10 bg-gradient-to-t from-slate-950 to-black/50 px-6 py-4 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-end glass-sm bg-gradient-to-br from-slate-900/40 to-blue-950/30 border border-blue-500/20 hover:border-blue-400/40 focus-within:border-blue-400/60 transition-all duration-300 rounded-xl shadow-lg shadow-blue-500/15 focus-within:shadow-blue-500/25">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your documents..."
              disabled={disabled}
              rows={1}
              className="flex-1 resize-none border-0 bg-transparent px-4 py-3 text-blue-50 placeholder-blue-300/40 focus:outline-none focus:ring-0 disabled:opacity-50 min-h-[48px] max-h-32 overflow-y-auto"
              style={{
                height: "auto",
                minHeight: "48px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 128) + "px";
              }}
            />

            {/* Send Button */}
            <div className="flex items-end p-2">
              <button
                type="submit"
                disabled={disabled || !message.trim()}
                className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white disabled:text-gray-500 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 active:scale-90 hover:-translate-y-0.5 disabled:hover:shadow-gray-700/20 disabled:hover:translate-y-0"
              >
                {disabled ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
              </button>
            </div>
          </div>

          {/* Hint Text */}
          <div className="flex items-center justify-between mt-3 px-2">
            <p className="text-xs text-blue-300/60">
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-400/40 rounded text-blue-300 text-xs font-medium transition-all hover:bg-blue-500/30 hover:border-blue-400/60">
                Enter
              </kbd>{" "}
              to send,{" "}
              <kbd className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-400/40 rounded text-blue-300 text-xs font-medium transition-all hover:bg-blue-500/30 hover:border-blue-400/60">
                Shift
              </kbd>{" "}
              +{" "}
              <kbd className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-400/40 rounded text-blue-300 text-xs font-medium transition-all hover:bg-blue-500/30 hover:border-blue-400/60">
                Enter
              </kbd>{" "}
              for new line
            </p>
            {message.length > 0 && (
              <p className="text-xs text-blue-400 font-medium animate-glow-pulse">
                {message.length} characters
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}