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
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 via-black to-slate-900">
      {messages.length === 0 && !isStreaming && !isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-400 max-w-md mx-auto px-6 animate-slide-up">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-emerald-500/20 border border-blue-400/40 rounded-lg mx-auto mb-6 flex items-center justify-center glow-blue hover-glow-blue">
              <FileText size={18} className="text-blue-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">
              Start a conversation
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Ask me anything about your documents and I&apos;ll help you find the
              answers.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-8">
            {messages.map((message) => (
              <div key={message.id} className="group">
                <MessageItem message={message} onFeedback={onFeedback} />

                {/* Citations UI */}
                {message.role === "assistant" &&
                  message.citations &&
                  message.citations.length > 0 && (
                    <div className="mt-6 ml-0 animate-slide-up">
                      <button
                        onClick={() => toggleCitations(message.id)}
                        className="w-full glass-sm bg-gradient-to-r from-white/5 to-blue-500/5 border-white/10 hover:border-blue-400/40 hover:bg-blue-500/10 rounded-lg p-4 transition-all duration-300 flex items-center justify-between group/btn"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-gradient-to-br from-blue-500/40 to-emerald-500/20 border border-blue-400/40 rounded-md flex items-center justify-center glow-blue">
                            <FileText size={12} className="text-blue-300" />
                          </div>
                          <span className="text-sm font-semibold text-gray-200 group-hover/btn:text-blue-100 transition-colors">
                            Sources ({message.citations.length})
                          </span>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-all duration-300 group-hover/btn:text-blue-300 ${
                            expandedCitations.has(message.id)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {expandedCitations.has(message.id) && (
                        <div className="grid gap-2 mt-3 animate-slide-up">
                          {message.citations.map((citation, citationIndex) => (
                            <div
                              key={citationIndex}
                              className="flex items-center gap-3 glass-sm bg-gradient-to-r from-white/5 to-emerald-500/5 border-white/10 hover:border-emerald-400/40 hover:bg-emerald-500/10 rounded-lg px-3 py-2 transition-all duration-300 hover:translate-x-1 group/citation"
                            >
                              {/* Document Icon */}
                              <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-emerald-500/40 to-blue-500/20 border border-emerald-400/40 rounded-md flex items-center justify-center glow-emerald">
                                <FileText size={12} className="text-emerald-300" />
                              </div>

                              {/* Citation Info */}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-200 truncate group-hover/citation:text-emerald-100 transition-colors">
                                  {citation.filename}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  Page {citation.page}
                                </p>
                              </div>

                              {/* Page Number Badge */}
                              <div className="flex-shrink-0">
                                <div className="w-6 h-6 bg-gradient-to-br from-emerald-500/30 to-blue-500/20 border border-emerald-400/40 rounded-md flex items-center justify-center glow-emerald">
                                  <span className="text-xs font-semibold text-emerald-200">
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
                  <div className="glass-sm bg-gradient-to-br from-white/5 to-emerald-500/10 border-white/10 rounded-lg p-4 max-w-[85%]">
                    <p className="whitespace-pre-wrap text-gray-100 leading-relaxed text-sm">
                      {streamingMessage}
                    </p>

                    {/* Typing Indicator */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-blue-400 ml-2 animate-glow-pulse">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State - with dynamic status */}
            {isLoading && !isStreaming && (
              <div className="flex justify-start animate-slide-up">
                <div className="glass-sm bg-gradient-to-br from-white/5 to-blue-500/10 border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Loader2 size={16} className="text-blue-400 animate-spin" />
                    <span className="text-sm text-gray-200 font-medium">
                      {agentStatus || "Thinking..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}