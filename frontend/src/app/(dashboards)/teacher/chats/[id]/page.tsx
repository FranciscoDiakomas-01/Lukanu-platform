// app/chat/page.tsx
"use client";

import { use, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashordHeader from "@/components/DashordHeader";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  sender: "user" | "bot" | string;
  text: string;
  timestamp?: string;
  status?: "sent" | "received";
  user?: {
    name: string;
    lastname: string;
    profile?: string;
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Olá! Como posso ajudar hoje?",
        timestamp: new Date().toLocaleString(),
        status: "received",
        user: {
          name: "João",
          lastname: "Dev",
          profile: "",
        },
      },
      {
        id: 2,
        sender: "user",
        text: "Oi, queria saber mais sobre o produto.",
        timestamp: new Date().toLocaleString(),
        status: "sent",
      },
      {
        id: 3,
        sender: "bot",
        text: "Claro! Nosso produto é incrível. 😄",
        timestamp: new Date().toLocaleString(),
        status: "received",
        user: {
          name: "João",
          lastname: "Dev",
          profile: "",
        },
      },
    ]);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const botReply: Message = {
        id: newMessage.id + 1,
        sender: "bot",
        text: "Resposta automática do bot. 😊",
        timestamp: new Date().toLocaleString(),
        status: "received",
        user: {
          name: "João",
          lastname: "Dev",
          profile: "",
        },
      };
      setMessages((prev) =>
        prev.map((msg) =>
          msg.timestamp
            ? msg
            : { ...msg, timestamp: new Date().toLocaleString() }
        )
      );
    }, 1000);
  };
  const router = useRouter();

  return (
    <main className="w-full h-screen overflow-hidden flex-col  flex gap-4 pb-4">
      <DashordHeader
        whoIs="seller"
        showInput={false}
        placeholder="Buscar por cursos"
      />
      <div className="w-full h-[90%] p-4 gap-2 flex flex-col ">
        <Button
          variant={"outline"}
          onClick={() => {
            router.back();
          }}
          className="lg:w-[10%] lg:place-self-end w-30 place-self-end"
        >
          Voltar
        </Button>
        <Card className="h-full flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-4 space-y-4 overflow-hidden">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              const initials = msg.user
                ? `${msg.user.name[0] ?? ""}${
                    msg.user.lastname[0] ?? ""
                  }`.toUpperCase()
                : "";

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 items-end ${
                    isUser
                      ? "justify-end"
                      : "flex-col place-self-start items-start"
                  }`}
                >
                  {!isUser && msg.user && (
                    <Avatar>
                      <AvatarImage
                        src={msg.user.profile || undefined}
                        alt={initials}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex flex-col items-start gap-1">
                    <div
                      className={`px-4 py-2 rounded-xl max-w-xs text-sm whitespace-pre-wrap shadow-md ${
                        isUser
                          ? "bg-blue-500 text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground ml-1">
                      {msg.timestamp} •{" "}
                      {msg.status === "sent" ? "Enviado" : "Recebido"}
                    </span>
                  </div>

                  <div ref={endRef} />
                </div>
              );
            })}
          </ScrollArea>
          <CardContent className="flex gap-2 border-t p-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button onClick={handleSend}>Enviar</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
