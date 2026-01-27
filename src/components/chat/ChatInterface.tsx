"use client";

import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { ErrorDisplay } from "./ErrorDisplay";
import { MessageSquare, Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleSendMessage = async (content: string) => {
    await onSendMessage(content);
  };

  const handleBack = () => {
    if (projectId) {
      router.push(`/projects/${projectId}`);
    } else {
      router.push("/projects");
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      {projectId && (
        <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-4">
            {/* Back Button - Mobile only */}
            <button
              onClick={handleBack}
              className="md:hidden p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors tap-highlight"
              aria-label="Back to project"
            >
              <ArrowLeft size={20} className="text-gray-400" />
            </button>

            {/* Chat Icon */}
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500/15 to-emerald-500/10 border border-white/10 rounded-xl flex items-center justify-center">
              <MessageSquare size={16} className="text-blue-300" />
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-gray-100 text-sm truncate">
                {chat?.title || "New Chat"}
              </h1>
              <p className="text-xs text-gray-500">Project Chat</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="px-4 md:px-6 pt-4">
          <ErrorDisplay error={error} onDismiss={onDismissError} />
        </div>
      )}

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
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto animate-slide-up">
            {/* Hero Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/15 to-emerald-500/10 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={28} className="text-gray-400" />
            </div>

            {/* Title & Description */}
            <h2 className="text-xl font-bold text-white mb-2">
              Ready to start?
            </h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              I can help you analyze your documents, answer questions, and
              provide insights from your knowledge base.
            </p>

            {/* Features List */}
            <div className="space-y-2 mb-8 text-left">
              {[
                "Analyze uploaded documents",
                "Search through your knowledge base",
                "Get AI-powered insights",
                "Work with tables and images",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-300 bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 p-3 rounded-xl transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {onCreateNewChat && (
              <button
                onClick={onCreateNewChat}
                disabled={isLoading}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:from-[#3b78e7] hover:to-[#2d9249] disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Start conversation
                  </>
                )}
              </button>
            )}

            {/* Helper Text */}
            <p className="text-xs text-gray-600 mt-6">
              Upload documents in the Knowledge Base to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
}