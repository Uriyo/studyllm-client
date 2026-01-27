"use client";

import { MessageSquare, Plus, AlertCircle, Trash2 } from "lucide-react";
import { Project, Chat } from "@/lib/types";

interface ConversationsListProps {
  project: Project;
  conversations: Chat[];
  error: string | null;
  loading: boolean;
  onCreateNewChat: () => void;
  onChatClick: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function ConversationsList({
  project,
  conversations,
  error,
  loading,
  onCreateNewChat,
  onChatClick,
  onDeleteChat,
}: ConversationsListProps) {
  const hasConversations = conversations.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Error Display */}
      {error && (
        <div className="px-4 md:px-6 pt-4 animate-slide-down">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm font-medium">{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6">
        <div className="max-w-3xl mx-auto">
          {/* Project Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8 animate-slide-up">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-white truncate">
                {project.name}
              </h1>
              {project.description && (
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>

            {/* Desktop New Conversation Button */}
            <button
              onClick={onCreateNewChat}
              disabled={loading}
              className="hidden sm:flex bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:from-[#3b78e7] hover:to-[#2d9249] disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-5 py-2.5 rounded-xl items-center gap-2 transition-all duration-200 font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:hover:shadow-none disabled:hover:translate-y-0 active:scale-95 flex-shrink-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  New conversation
                </>
              )}
            </button>
          </div>

          {/* Conversations Section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Conversations
              </h2>
              <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-lg font-medium">
                {conversations.length}
              </span>
            </div>

            {!hasConversations ? (
              <div className="text-center py-12 md:py-16 animate-slide-up">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/15 to-emerald-500/10 border border-white/10 rounded-2xl mx-auto mb-5 flex items-center justify-center">
                  <MessageSquare size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  No conversations yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
                  Start your first conversation to analyze documents and get
                  insights from your AI assistant.
                </p>
                <button
                  onClick={onCreateNewChat}
                  disabled={loading}
                  className="bg-gradient-to-r from-[#4285f4] to-[#34a853] hover:from-[#3b78e7] hover:to-[#2d9249] disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus size={18} />
                      Start first conversation
                    </div>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((chat, index) => (
                  <div
                    key={chat.id}
                    onClick={() => onChatClick(chat.id)}
                    className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-4 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 animate-slide-up tap-highlight"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Chat Icon */}
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500/15 to-emerald-500/10 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MessageSquare
                          size={18}
                          className="text-blue-300 group-hover:text-blue-200 transition-colors"
                        />
                      </div>

                      {/* Chat Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-200 group-hover:text-white truncate transition-colors">
                          {chat.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {new Date(chat.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer border border-transparent hover:border-red-500/20"
                        title="Delete chat"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Mobile FAB */}
      {hasConversations && (
        <button
          onClick={onCreateNewChat}
          disabled={loading}
          className="sm:hidden fixed bottom-24 left-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 z-20 transition-transform hover:scale-105 active:scale-95"
          aria-label="New conversation"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus size={24} className="text-white" />
          )}
        </button>
      )}
    </div>
  );
}