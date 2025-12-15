import { ThumbsUp, ThumbsDown, User, Bot } from "lucide-react";

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

interface MessageItemProps {
  message: Message;
  onFeedback?: (messageId: string, type: "like" | "dislike") => void;
}

export function MessageItem({ message, onFeedback }: MessageItemProps) {
  const isUser = message.role === "user";
  const time = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} group animate-slide-up`}>
      <div className={`max-w-[85%] ${isUser ? "ml-12" : "mr-12"} relative`}>
        {/* Avatar & Message Container */}
        <div className="flex items-start gap-3">
          {/* Avatar - Only show for assistant */}
          {!isUser && (
            <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500/40 to-emerald-500/20 border border-blue-400/40 rounded-lg flex items-center justify-center mt-1 glow-blue transition-all duration-300">
              <Bot size={14} className="text-blue-300" />
            </div>
          )}

          {/* Message Bubble */}
          <div
            className={`rounded-lg p-4 border transition-all duration-300 ${
              isUser
                ? "glass-sm bg-blue-500/20 border-blue-400/30 text-blue-50 hover:bg-blue-500/25 hover:border-blue-400/50 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30"
                : "glass-sm bg-white/5 border-white/10 text-gray-100 hover:bg-white/10 hover:border-blue-400/40 group-hover:shadow-lg group-hover:shadow-emerald-500/20"
            }`}
          >
            <p className="whitespace-pre-wrap leading-relaxed text-sm">
              {message.content}
            </p>
          </div>

          {/* User Avatar - Only show for user */}
          {isUser && (
            <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500/40 to-blue-400/20 border border-blue-400/40 rounded-lg flex items-center justify-center mt-1 glow-blue transition-all duration-300">
              <User size={14} className="text-blue-300" />
            </div>
          )}
        </div>

        {/* Feedback Buttons - Only show for assistant messages */}
        {!isUser && (
          <div className="absolute -bottom-3 right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1 glass-sm bg-white/10 border-white/20 rounded-lg p-1.5">
            <button
              onClick={() => onFeedback?.(message.id, "like")}
              className="p-1.5 hover:bg-emerald-500/20 hover:border border-emerald-400/30 rounded-md transition-all duration-300 group/btn active:scale-90"
              title="Like this response"
            >
              <ThumbsUp
                size={12}
                className="text-gray-400 group-hover/btn:text-emerald-300 transition-colors"
              />
            </button>
            <button
              onClick={() => onFeedback?.(message.id, "dislike")}
              className="p-1.5 hover:bg-red-500/20 hover:border border-red-400/30 rounded-md transition-all duration-300 group/btn active:scale-90"
              title="Dislike this response"
            >
              <ThumbsDown
                size={12}
                className="text-gray-400 group-hover/btn:text-red-300 transition-colors"
              />
            </button>
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`flex items-center gap-2 mt-2 px-1 ${
            isUser ? "justify-end" : "justify-start ml-10"
          }`}
        >
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {time}
          </span>
          {!isUser && (
            <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          )}
        </div>
      </div>
    </div>
  );
}