"use client";

import { use, useState, useEffect } from "react";
import { ConversationsList } from "@/components/projects/ConversationsList";
import { KnowledgeBaseSidebar } from "@/components/projects/KnowledgeBaseSidebar";
import { FileDetailsModal } from "@/components/projects/FileDetailsModal";
import { apiClient } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NotFound } from "@/components/ui/NotFound";
import { Project, Chat, ProjectDocument, ProjectSettings } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FileText, X } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

interface ProjectData {
  project: Project | null;
  chats: Chat[];
  documents: ProjectDocument[];
  settings: ProjectSettings | null;
}

function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = use(params);
  const { getToken, userId } = useAuth();
  const router = useRouter();

  // Data State
  const [data, setData] = useState<ProjectData>({
    project: null,
    chats: [],
    documents: [],
    settings: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  // UI states
  const [activeTab, setActiveTab] = useState<"documents" | "settings">(
    "documents"
  );

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null
  );

  // Mobile bottom sheet state
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);

  // Close bottom sheet on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsKnowledgeBaseOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*
    ! Business Logic Functions - Core operations for this project:
    * - loadProjectData: Load all project data from the server
  */
  useEffect(() => {
    const loadAllData = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        const token = await getToken();

        const [projectRes, chatsRes, documentsRes, settingsRes] =
          await Promise.all([
            apiClient.get(`/api/projects/${projectId}`, token),
            apiClient.get(`/api/projects/${projectId}/chats`, token),
            apiClient.get(`/api/projects/${projectId}/files`, token),
            apiClient.get(`/api/projects/${projectId}/settings`, token),
          ]);

        setData({
          project: projectRes.data,
          chats: chatsRes.data,
          documents: documentsRes.data,
          settings: settingsRes.data,
        });
      } catch (err) {
        setError("Failed to fetch data");
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [userId, projectId]);

  /*
   * Short Polling
   */
  useEffect(() => {
    const hasProcessingDocuments = data.documents.some(
      (doc) =>
        doc.processing_status &&
        !["completed", "failed"].includes(doc.processing_status)
    );

    if (!hasProcessingDocuments) {
      return;
    }

    const pollInterval = setInterval(async () => {
      try {
        const token = await getToken();
        const documentsRes = await apiClient.get(
          `/api/projects/${projectId}/files`,
          token
        );

        setData((prev) => ({
          ...prev,
          documents: documentsRes.data,
        }));
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [data.documents, projectId, getToken]);

  /*
  ! User Interation functions
  */

  const handleCreateNewChat = async () => {
    if (!userId) return;

    try {
      setIsCreatingChat(true);
      const token = await getToken();
      const chatNumber = Date.now() % 10000;
      const result = await apiClient.post(
        "/api/chats/",
        {
          title: `Chat #${chatNumber}`,
          project_id: projectId,
        },
        token
      );
      const savedChat = result.data;
      router.push(`/projects/${projectId}/chats/${savedChat.id}`);

      setData((prev) => ({
        ...prev,
        chats: [savedChat, ...prev.chats],
      }));

      toast.success("Chat Created successfully");
    } catch (err: unknown) {
      console.error("Failed to create chat", err);
      toast.error("Failed to create chat");
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!userId) return;

    try {
      const token = await getToken();

      await apiClient.delete(`/api/chats/${chatId}`, token);

      setData((prev) => ({
        ...prev,
        chats: prev.chats.filter((chat) => chat.id !== chatId),
      }));

      toast.success("Chat deleted successfully");
    } catch (err: unknown) {
      toast.error("Failed to delete chat");
    }
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/projects/${projectId}/chats/${chatId}`);
  };

  const handleDocumentUpload = async (files: File[]) => {
    if (!userId) return;

    const token = await getToken();
    const uploadedDocuments: ProjectDocument[] = [];

    const uploadPromises = files.map(async (file) => {
      try {
        const uploadData = await apiClient.post(
          `/api/projects/${projectId}/files/upload-url`,
          {
            filename: file.name,
            file_size: file.size,
            file_type: file.type,
          },
          token
        );

        const { upload_url, s3_key } = uploadData.data;

        await apiClient.uploadToS3(upload_url, file);

        const updatedDocument = await apiClient.post(
          `/api/projects/${projectId}/files/confirm`,
          {
            s3_key,
          },
          token
        );

        uploadedDocuments.push(updatedDocument.data);
      } catch (err) {
        toast.error(`Failed to upload ${file.name}`);
      }
    });

    await Promise.allSettled(uploadPromises);

    if (uploadedDocuments.length > 0) {
      setData((prev) => ({
        ...prev,
        documents: [...uploadedDocuments, ...prev.documents],
      }));

      toast.success(`${uploadedDocuments.length} file(s) uploaded`);
    }
  };

  const handleDocumentDelete = async (documentId: string) => {
    if (!userId) return;

    try {
      const token = await getToken();

      await apiClient.delete(
        `/api/projects/${projectId}/files/${documentId}`,
        token
      );

      setData((prev) => ({
        ...prev,
        documents: prev.documents.filter((doc) => doc.id !== documentId),
      }));

      toast.success("Document deleted successfully!");
    } catch (err: unknown) {
      toast.error("Document deletion failed");
    }
  };

  const handleUrlAdd = async (url: string) => {
    if (!userId) return;

    try {
      const token = await getToken();

      const result = await apiClient.post(
        `/api/projects/${projectId}/urls`,
        {
          url,
        },
        token
      );

      const newDocument = result.data;

      setData((prev) => ({
        ...prev,
        documents: [newDocument, ...prev.documents],
      }));

      toast.success("Website added successfully!");
    } catch (err: unknown) {
      toast.error("Failed to add website");
    }
  };

  const handleOpenDocument = (documentId: string) => {
    setSelectedDocumentId(documentId);
  };

  const handleDraftSettings = (updates: Partial<ProjectSettings>) => {
    setData((prev) => {
      if (!prev.settings) {
        console.warn("Cannot update settings: not loaded yet");
        return prev;
      }

      return {
        ...prev,
        settings: {
          ...prev.settings,
          ...updates,
        },
      };
    });
  };

  const handlePublishSettings = async () => {
    if (!userId || !data.settings) {
      toast.error("Cannot save settings");
      return;
    }

    try {
      const token = await getToken();

      const result = await apiClient.put(
        `/api/projects/${projectId}/settings`,
        data.settings,
        token
      );

      setData((prev) => ({
        ...prev,
        settings: result.data,
      }));

      toast.success("Settings saved successfully!");
    } catch (err: unknown) {
      toast.error("Failed to save settings!");
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading project..." />;
  }

  if (!data.project) {
    return <NotFound message="Project not found" />;
  }

  const selectedDocument = selectedDocumentId
    ? data.documents.find((doc) => doc.id == selectedDocumentId)
    : null;

  return (
    <>
      <div className="flex flex-col lg:flex-row h-full bg-[#0a0a0a] overflow-hidden">
        {/* Main Content - Conversations */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <ConversationsList
            project={data.project}
            conversations={data.chats}
            error={null}
            loading={isCreatingChat}
            onCreateNewChat={handleCreateNewChat}
            onChatClick={handleChatClick}
            onDeleteChat={handleDeleteChat}
          />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 xl:w-96 border-l border-white/5">
          <KnowledgeBaseSidebar
            activeTab={activeTab}
            onSetActiveTab={setActiveTab}
            projectDocuments={data.documents}
            onDocumentUpload={handleDocumentUpload}
            onDocumentDelete={handleDocumentDelete}
            onOpenDocument={handleOpenDocument}
            onUrlAdd={handleUrlAdd}
            projectSettings={data.settings}
            settingsError={null}
            settingsLoading={false}
            onUpdateSettings={handleDraftSettings}
            onApplySettings={handlePublishSettings}
          />
        </div>

        {/* Mobile Bottom Sheet Toggle */}
        <button
          onClick={() => setIsKnowledgeBaseOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 z-30 transition-transform hover:scale-105 active:scale-95"
          aria-label="Open Knowledge Base"
        >
          <FileText size={24} className="text-white" />
        </button>

        {/* Mobile Bottom Sheet */}
        <div
          className={`drawer-overlay lg:hidden ${isKnowledgeBaseOpen ? "open" : ""}`}
          onClick={() => setIsKnowledgeBaseOpen(false)}
        />
        <div
          className={`drawer-bottom lg:hidden ${isKnowledgeBaseOpen ? "open" : ""}`}
          style={{ height: "85vh" }}
        >
          <div className="drawer-handle" />
          <div className="flex items-center justify-between px-4 pb-2">
            <h2 className="text-lg font-semibold text-white">Knowledge Base</h2>
            <button
              onClick={() => setIsKnowledgeBaseOpen(false)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden h-[calc(85vh-60px)]">
            <KnowledgeBaseSidebar
              activeTab={activeTab}
              onSetActiveTab={setActiveTab}
              projectDocuments={data.documents}
              onDocumentUpload={handleDocumentUpload}
              onDocumentDelete={handleDocumentDelete}
              onOpenDocument={handleOpenDocument}
              onUrlAdd={handleUrlAdd}
              projectSettings={data.settings}
              settingsError={null}
              settingsLoading={false}
              onUpdateSettings={handleDraftSettings}
              onApplySettings={handlePublishSettings}
              isMobile
            />
          </div>
        </div>
      </div>

      {selectedDocument && (
        <FileDetailsModal
          document={selectedDocument}
          onClose={() => setSelectedDocumentId(null)}
        />
      )}
    </>
  );
}

export default ProjectPage;