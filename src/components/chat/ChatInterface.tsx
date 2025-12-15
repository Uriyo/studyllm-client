"use client";

import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { ErrorDisplay } from "./ErrorDisplay";
import { MessageSquare, Plus } from "lucide-react";

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

interface Chat {
  id: string;
  project_id: string | null;
  title: string;
  messages: Message[];
  created_at: string;
  clerk_id: string;
}

interface ChatInterfaceProps {
  chat?: Chat;
  projectId?: string;
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onDismissError: () => void;
  onCreateNewChat?: () => void;
  streamingMessage?: string;
  isStreaming?: boolean;
  agentStatus?: string;
  onFeedback?: (messageId: string, type: "like" | "dislike") => void;
}

export function ChatInterface({
  chat,
  projectId,
  onSendMessage,
  isLoading,
  error,
  onDismissError,
  onCreateNewChat,
  streamingMessage,
  isStreaming,
  agentStatus,
  onFeedback,
}: ChatInterfaceProps) {
  const handleSendMessage = async (content: string) => {
    await onSendMessage(content);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black p-4">
      <div className="flex flex-col h-full glass-lg text-white rounded-2xl overflow-hidden border border-white/10">
        {/* Header */}
        {projectId && (
          <div className="glass-sm border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent sticky top-0 z-10 backdrop-blur-xl">
            <div className="max-w-4xl mx-auto px-6 py-4">
              <div className="flex items-center gap-3">
                {/* Chat Icon with Glow */}
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500/30 to-emerald-500/20 border border-blue-400/40 rounded-lg flex items-center justify-center glow-blue transition-all duration-300 hover:glow-blue">
                  <MessageSquare size={14} className="text-blue-300" />
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="font-semibold text-gray-100 text-sm truncate">
                    {chat?.title || "New Chat"}
                  </h1>
                  <p className="text-xs text-gray-400">Project Chat</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && <ErrorDisplay error={error} onDismiss={onDismissError} />}

        {/* Chat Content */}
        {chat ? (
          <>
            <MessageList
              messages={chat.messages}
              isLoading={isLoading}
              streamingMessage={streamingMessage}
              isStreaming={isStreaming}
              agentStatus={agentStatus}
              onFeedback={onFeedback}
            />
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading || (isStreaming ?? false)}
            />
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6 animate-slide-up">
              {/* Hero Icon with Glow */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/25 to-emerald-500/15 border border-blue-400/40 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-blue hover-glow-blue">
                <MessageSquare size={24} className="text-blue-300" />
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-emerald-200 to-blue-200 mb-3">
                Ready to start?
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I can help you analyze your documents, answer questions, and
                provide insights based on your project&apos; knowledge base.
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8 text-left">
                {[
                  "Analyze uploaded documents",
                  "Search through your knowledge base",
                  "Get AI-powered insights",
                  "Work with tables and images",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-200 glass-sm bg-blue-500/5 border-blue-400/20 hover:bg-blue-500/10 hover:border-blue-400/40 p-3 transition-all duration-300 hover:translate-x-1 cursor-default group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 group-hover:animate-glow-pulse"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {onCreateNewChat && (
                <button
                  onClick={onCreateNewChat}
                  disabled={isLoading}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:hover:shadow-none disabled:hover:translate-y-0 active:scale-95 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Start conversation
                    </>
                  )}
                </button>
              )}

              {/* Helper Text */}
              <p className="text-xs text-gray-500 mt-6">
                You can upload documents in the Sources panel to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}