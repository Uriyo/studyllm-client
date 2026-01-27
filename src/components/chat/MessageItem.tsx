"use client";

import { ThumbsUp, ThumbsDown, User, Sparkles } from "lucide-react";

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
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
    >
      <div className={`max-w-[90%] md:max-w-[85%] ${isUser ? "ml-8" : "mr-8"} relative`}>
        {/* Avatar & Message Container */}
        <div className="flex items-start gap-2.5">
          {/* Avatar - Only show for assistant */}
          {!isUser && (
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-emerald-500/15 border border-white/10 rounded-xl flex items-center justify-center mt-0.5">
              <Sparkles size={14} className="text-blue-300" />
            </div>
          )}

          {/* Message Bubble */}
          <div
            className={`rounded-2xl p-4 transition-all duration-200 ${
              isUser
                ? "bg-gradient-to-br from-blue-500/20 to-blue-600/15 border border-blue-500/20 text-gray-100"
                : "bg-white/[0.03] border border-white/[0.06] text-gray-200"
            }`}
          >
            <p className="whitespace-pre-wrap leading-relaxed text-sm">
              {message.content}
            </p>
          </div>

          {/* User Avatar - Only show for user */}
          {isUser && (
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center mt-0.5">
              <User size={14} className="text-blue-300" />
            </div>
          )}
        </div>

        {/* Footer: Timestamp and Feedback */}
        <div
          className={`flex items-center gap-3 mt-2 px-1 ${
            isUser ? "justify-end pr-10" : "justify-start pl-10"
          }`}
        >
          <span className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {time}
          </span>

          {/* Feedback Buttons - Only show for assistant messages */}
          {!isUser && onFeedback && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
              <button
                onClick={() => onFeedback(message.id, "like")}
                className="p-1.5 hover:bg-emerald-500/15 rounded-lg transition-all duration-200 tap-highlight"
                title="Like this response"
              >
                <ThumbsUp
                  size={14}
                  className="text-gray-500 hover:text-emerald-400 transition-colors"
                />
              </button>
              <button
                onClick={() => onFeedback(message.id, "dislike")}
                className="p-1.5 hover:bg-red-500/15 rounded-lg transition-all duration-200 tap-highlight"
                title="Dislike this response"
              >
                <ThumbsDown
                  size={14}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}