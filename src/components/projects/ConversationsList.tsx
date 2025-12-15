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
    <div className="flex-1 flex flex-col glass-lg border-white/10 rounded-2xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
      {/* Error Display */}
      {error && (
        <div className="p-6 pb-0 animate-slide-down">
          <div className="glass-sm bg-gradient-to-r from-red-500/15 to-red-500/5 border-red-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={14} className="text-red-300 flex-shrink-0" />
              <span className="text-red-200 text-sm font-medium">{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-emerald-200 mb-1">
                {project.name}
              </h1>
              {project.description && (
                <p className="text-gray-400">{project.description}</p>
              )}
            </div>

            <button
              onClick={onCreateNewChat}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 disabled:hover:shadow-none disabled:hover:translate-y-0 active:scale-95"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  New conversation
                </>
              )}
            </button>
          </div>

          {/* Conversations Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-200">
                Conversations
              </h2>
              <span className="text-xs text-gray-300 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border border-blue-400/30 px-3 py-1 rounded-full font-medium">
                {conversations.length}
              </span>
            </div>

            {!hasConversations ? (
              <div className="text-center py-16 animate-slide-up">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-emerald-500/20 border border-blue-400/40 rounded-lg mx-auto mb-6 flex items-center justify-center glow-blue hover-glow-blue">
                  <MessageSquare size={18} className="text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-3">
                  No conversations yet
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                  Start your first conversation in this project to analyze
                  documents and get insights from your AI assistant.
                </p>
                <button
                  onClick={onCreateNewChat}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus size={16} />
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
                    className="group glass-sm bg-gradient-to-r from-white/5 to-blue-500/5 border-white/10 hover:border-blue-400/40 hover:bg-blue-500/10 rounded-lg p-4 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/15 hover:translate-x-1 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Chat Icon */}
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/40 to-emerald-500/20 border border-blue-400/40 rounded-lg flex items-center justify-center flex-shrink-0 glow-blue group-hover:glow-blue transition-all duration-300">
                        <MessageSquare
                          size={14}
                          className="text-blue-300 group-hover:text-blue-200 transition-colors"
                        />
                      </div>

                      {/* Chat Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-200 group-hover:text-blue-100 truncate transition-colors">
                          {chat.title}
                        </h3>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:scale-110 active:scale-95 border border-transparent hover:border-red-500/30"
                        title="Delete chat"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}