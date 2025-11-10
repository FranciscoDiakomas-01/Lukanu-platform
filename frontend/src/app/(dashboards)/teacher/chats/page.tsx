"use client";

import { ChatCard } from "@/components/chat";
import DashordHeader from "@/components/DashordHeader";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatMocks } from "@/constants/mocks/chat";
import Chat from "@/types/chat";
import clsx from "clsx";
import { ChevronRight, Loader2, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
export default function ChatTeacher() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [load, setLoad] = useState(true);
  const [active, setActive] = useState<Chat | undefined>(undefined);
  const [loadMessages, setLoadMessages] = useState(true);
  const [messagesList, setMessagesList] = useState<
    { message: string; timestamp: Date }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const courses = [
    "Matemática",
    "Física",
    "Programação",
    "Química",
    "História",
    "Biologia",
    "Geografia",
    "Artes",
    "Literatura",
    "Economia",
    "Filosofia",
    "Estatística",
    "Engenharia",
    "Design",
    "Marketing",
    "Administração",
    "Sociologia",
    "Psicologia",
    "Astronomia",
    "Robótica",
  ];

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setChats(chatMocks);
      setActive(chatMocks[0]);
      setLoad(false);
    }, 2000);
  }, []);
  useEffect(() => {
    if (active) {
      setLoadMessages(true);
      setMessagesList([]);
      setTimeout(() => {
        setMessagesList([
          {
            message: "Olá! Este é o início da conversa.",
            timestamp: new Date(),
          },
          {
            message: active.message.message,
            timestamp: active.message.timestamp,
          },
        ]);
        setLoadMessages(false);
      }, 1000);
    }
  }, [active]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesList]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessagesList((prev) => [
      ...prev,
      { message: newMessage, timestamp: new Date() },
    ]);
    setNewMessage("");
  };

  return (
    <main className="w-full pb-10 flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="teacher" showInput={false} />

      {load ? (
        <div className="flex justify-center items-center min-h-[70dvh]">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          {Array.isArray(chats) && chats.length > 0 ? (
            <article className="flex px-4 lg:h-[85dvh] overflow-hidden gap-4">
              {/* Lista de conversas */}
              <ScrollArea className="h-full lg:w-[30%] w-full rounded-md border px-2 gap-4">
                <h1 className="mt-4 font-bold">Estudantes</h1>

                {chats.map((item, index) => (
                  <div key={index} onClick={() => setActive(item)}>
                    <ChatCard chat={item} isACtive={active?.id == item.id} />
                  </div>
                ))}
              </ScrollArea>

              {/* Mini chat */}
              <aside className="flex-1 hidden rounded-md border lg:flex flex-col">
                {active && (
                  <>
                    <header className="p-2 rounded-md border-b flex items-center gap-3 bg-blue-500">
                      <img
                        src={active.user.profile}
                        alt={active.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h2 className="font-semibold text-white">
                          {active.user.name} {active.user.lastname}
                        </h2>
                        <span className="text-xs text-white">
                          {active.status === "read" ? "Online" : "Offline"}
                        </span>
                      </div>
                    </header>

                    {/* Corpo do chat */}
                    <div className="flex-1 relative overflow-hidden">
                      {loadMessages ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="animate-spin w-6 h-6" />
                        </div>
                      ) : (
                        <ScrollArea className="h-full p-4">
                          {messagesList.map((msg, i) => (
                            <div
                              key={i}
                              className={clsx(
                                "p-2 mb-2 rounded-lg text-white max-w-[75%]",
                                i % 2 === 0
                                  ? "bg-gray-800 self-start"
                                  : "bg-blue-500 text-white place-self-end self-end"
                              )}
                            >
                              {msg.message}
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </ScrollArea>
                      )}
                    </div>

                    {/* Input de mensagem */}
                    <footer className="p-4 border-t flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 border rounded-md px-3 py-2 text-sm"
                        placeholder="Digite sua mensagem..."
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      />
                      <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-3 rounded-md flex items-center justify-center"
                      >
                        <Send size={18} />
                      </button>
                    </footer>
                  </>
                )}
              </aside>
            </article>
          ) : (
            <aside className="flex justify-center items-center">
              <h1>Sem conversas disponíveis</h1>
            </aside>
          )}
        </>
      )}
    </main>
  );
}
