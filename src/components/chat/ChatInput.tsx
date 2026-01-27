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
    <div className="sticky bottom-0 border-t border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl px-4 md:px-6 py-4 safe-area-bottom">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-end bg-white/[0.04] border border-white/10 hover:border-white/15 focus-within:border-blue-500/40 transition-all duration-200 rounded-2xl shadow-lg shadow-black/20 focus-within:shadow-blue-500/10">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your documents..."
              disabled={disabled}
              rows={1}
              className="flex-1 resize-none border-0 bg-transparent px-4 py-3.5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0 disabled:opacity-50 min-h-[52px] max-h-32 overflow-y-auto text-sm"
              style={{
                height: "auto",
                minHeight: "52px",
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
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:from-[#3b78e7] hover:to-[#2d9249] disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white disabled:text-gray-500 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-90 hover:-translate-y-0.5 disabled:hover:shadow-none disabled:hover:translate-y-0"
                aria-label="Send message"
              >
                {disabled ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Hint Text - simplified on mobile */}
          <div className="flex items-center justify-between mt-2.5 px-1">
            <p className="text-xs text-gray-600 hidden sm:block">
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400 text-xs font-medium">
                Enter
              </kbd>{" "}
              to send,{" "}
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400 text-xs font-medium">
                Shift
              </kbd>
              +
              <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400 text-xs font-medium">
                Enter
              </kbd>{" "}
              for new line
            </p>
            <p className="text-xs text-gray-600 sm:hidden">
              Tap{" "}
              <span className="text-blue-400">send</span>{" "}
              to submit
            </p>
            {message.length > 0 && (
              <p className="text-xs text-gray-500 font-medium">
                {message.length} chars
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}