"use client";

import { useEffect, useRef, useState } from "react";
import { MessageItem } from "./MessageItem";
import { FileText, Loader2, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  created_at: string;
  chat_id: string;
  clerk_id: string;
  citations?: Array<{
    filename: string;
    page: number;
  }>;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  streamingMessage?: string;
  isStreaming?: boolean;
  agentStatus?: string;
  onFeedback?: (messageId: string, type: "like" | "dislike") => void;
}

export function MessageList({
  messages = [],
  isLoading,
  streamingMessage = "",
  isStreaming = false,
  agentStatus = "",
  onFeedback,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expandedCitations, setExpandedCitations] = useState<Set<string>>(
    new Set()
  );

  const toggleCitations = (messageId: string) => {
    setExpandedCitations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a0a]">
      {messages.length === 0 && !isStreaming && !isLoading ? (
        <div className="flex items-center justify-center h-full px-4">
          <div className="text-center max-w-sm mx-auto animate-slide-up">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/15 to-emerald-500/10 border border-white/10 rounded-2xl mx-auto mb-5 flex items-center justify-center">
              <FileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Ask me anything about your documents and I&apos;ll help you find the
              answers.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="group">
                <MessageItem message={message} onFeedback={onFeedback} />

                {/* Citations UI */}
                {message.role === "assistant" &&
                  message.citations &&
                  message.citations.length > 0 && (
                    <div className="mt-4 animate-slide-up">
                      <button
                        onClick={() => toggleCitations(message.id)}
                        className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-3 transition-all duration-200 flex items-center justify-between tap-highlight"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 bg-gradient-to-br from-blue-500/15 to-emerald-500/10 border border-white/10 rounded-lg flex items-center justify-center">
                            <FileText size={14} className="text-blue-300" />
                          </div>
                          <span className="text-sm font-medium text-gray-300">
                            Sources ({message.citations.length})
                          </span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`text-gray-500 transition-transform duration-200 ${
                            expandedCitations.has(message.id) ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedCitations.has(message.id) && (
                        <div className="grid gap-2 mt-2 animate-slide-up">
                          {message.citations.map((citation, citationIndex) => (
                            <div
                              key={citationIndex}
                              className="flex items-center gap-3 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 rounded-xl px-3 py-2.5 transition-all duration-200 tap-highlight"
                            >
                              {/* Document Icon */}
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500/15 to-blue-500/10 border border-white/10 rounded-lg flex items-center justify-center">
                                <FileText size={14} className="text-emerald-300" />
                              </div>

                              {/* Citation Info */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-300 truncate">
                                  {citation.filename}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Page {citation.page}
                                </p>
                              </div>

                              {/* Page Badge */}
                              <div className="flex-shrink-0">
                                <div className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                                  <span className="text-xs font-semibold text-emerald-300">
                                    {citation.page}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            ))}

            {/* Streaming Message */}
            {isStreaming && streamingMessage && (
              <div className="group animate-slide-up">
                <div className="flex justify-start">
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 max-w-[90%] md:max-w-[85%]">
                    <p className="whitespace-pre-wrap text-gray-200 leading-relaxed text-sm">
                      {streamingMessage}
                    </p>

                    {/* Typing Indicator */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                        <div
                          className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                      <span className="text-xs text-blue-400 ml-1">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && !isStreaming && (
              <div className="flex justify-start animate-slide-up">
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <Loader2 size={16} className="text-blue-400 animate-spin" />
                    <span className="text-sm text-gray-300">
                      {agentStatus || "Thinking..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
}