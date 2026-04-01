import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import {
  ArrowRight,
  Menu,
  X,
  PlusIcon,
  User,
  Bot,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Dashboard() {
  const [chatInput, setchatInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chat = useChat();
  const { user } = useSelector((state) => state.auth);
  const { chats, currentchatId, isLoading } = useSelector(
    (state) => state.chat,
  );
  // send message hander
  const handleSend = async (e) => {
    e.preventDefault();
    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) return;

    chat.sendMessageHandler({
      message: trimmedMessage,
      chatId: currentchatId,
    });

    setchatInput("");
  };

  // open chat handler
  const openChat = (chatId ,) => {
    chat.handleOpneChat(chatId );
  };

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.getChatsHandler();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentchatId]);


  
  return (
    <main className="flex h-screen overflow-hidden bg-black text-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-gray-950 border-r border-gray-800 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } transition-transform duration-300`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-md font-bold">
              AI
            </div>
            <span className="font-semibold">MyAI</span>
          </div>

          <X
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* ✅ Sidebar scroll fixed */}
        <div className="p-3 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-64px)] scrollbar-hide">
          {/* ✅ Create New Chat */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 focus-within:border-gray-600 transition">
            <PlusIcon size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="New chat..."
              className="bg-transparent outline-none text-sm text-gray-200 placeholder:text-gray-500 flex-1"
            />
          </div>

          {/* ✅ Search */}
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 focus-within:border-gray-600 transition">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="bg-transparent outline-none text-sm text-gray-200 placeholder:text-gray-500 flex-1"
            />
          </div>

          {/* ✅ Chat List */}
          {!chats || Object.values(chats).length === 0 ? (
            <p className="text-gray-500 text-sm text-center mt-4">
              No chats yet
            </p>
          ) : (
            <div className="space-y-2">
              {Object.values(chats)?.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => openChat(chat.id )}
                  className={`group flex items-center justify-between p-3 rounded-lg text-sm cursor-pointer transition-all duration-200
            ${
              currentchatId === chat.id
                ? "bg-gray-800 border border-gray-700"
                : "bg-gray-900 hover:bg-gray-800 border border-transparent hover:border-gray-700"
            }`}
                >
                  {/* ✅ Chat Title */}
                  <p className="text-gray-200 truncate max-w-[70%]">
                    {chat.title}
                  </p>

                  {/* ✅ Actions (show on hover) */}
                  <div className="hidden group-hover:flex items-center gap-2 text-gray-400">
                    {/* Rename */}
                    <Pencil
                      size={14}
                      className="hover:text-white cursor-pointer"
                    />

                    {/* Delete */}
                    <Trash2
                      size={14}
                      className="hover:text-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Section */}
      <section className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="p-4 border-b border-gray-800 flex items-center gap-3">
          <Menu
            className="md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
          <h1 className="text-lg font-semibold">AI Chat</h1>
        </header>

        {/* ✅ Chat container fixed */}
        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto overflow-hidden">
          {/* ✅ Only this scrolls */}
          <div className="space-y-2 flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
            {chats && chats[currentchatId]?.messages?.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-3xl">Hello User, how can I help?</p>
              </div>
            )}

            {chats &&
              chats[currentchatId]?.messages?.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* ✅ AI Icon */}
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-gray-800">
                      <Bot size={20} />
                    </div>
                  )}

                  {/* {isLoading && (
                    <p className="text-sm text-gray-500 text-center pb-2 animate-pulse animation-all duration-300 ">
                      AI is thinking...
                    </p>
                  )} */}

                  {/* ✅ Message Bubble */}
                  <div
                    className={`p-3 rounded-2xl max-w-full md:max-w-5xl ${
                      msg.role === "user"
                        ? "bg-gray-950 text-gray-200 rounded-br-xs text-xs md:text-sm"
                        : " text-gray-200 rounded-bl-xs text-xs md:text-sm"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-2 list-disc pl-5">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-2 list-decimal pl-5">
                              {children}
                            </ol>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-white/10 px-1 py-0.5">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
                              {children}
                            </pre>
                          ),
                        }}
                        remarkPlugins={[remarkGfm]}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>

                  {/* ✅ User Icon */}
                  {msg.role === "user" && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black">
                      <User size={18} />
                    </div>
                  )}
                </motion.div>
              ))}

            <div ref={messagesEndRef} />
          </div>

          {/* ✅ Input fixed inside layout (no position fixed) */}
          <div className="p-4  ">
            <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2">
              <PlusIcon />
              <input
                value={chatInput}
                onChange={(e) => setchatInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
              />
              <button
                onClick={handleSend}
                disabled={!chatInput.trim()}
                className="px-4 py-2 bg-white text-black rounded-lg hover:opacity-90 text-sm cursor-pointer"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
