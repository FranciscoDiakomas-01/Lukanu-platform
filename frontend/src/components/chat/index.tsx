"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Chat from "@/types/chat";
import clsx from "clsx";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useState } from "react";

export function ChatCard({
  chat,
  isACtive,
}: {
  chat: Chat;
  isACtive: boolean;
}) {
  const [item, setItem] = useState(chat);
  return (
    <div
      className={clsx("my-3", {
        "bg-gray-500": isACtive,
      })}
    >
      {/* Desktop */}

      <span
        onClick={() => {
          setItem((prev) => ({ ...prev, status: "read" }));
        }}
        className={clsx(
          "hidden cursor-pointer transition-colors  lg:flex w-full p-2  gap-4",
          {
            "bg-blue-500/20": item.status == "unread",
          }
        )}
      >
        <Avatar>
          <AvatarImage src={item.user.profile} alt={`@${item.user.name}`} />
          <AvatarFallback className="uppercase">
            {item.user.name.charAt(0) + item.user.lastname.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="flex flex-wrap gap-4  w-full">
          <div>
            <h1>{item.user.name + " " + item.user.lastname}</h1>
            <small>
              {item.message?.message &&
                item.message.message?.slice(0, 30) + "..."}
            </small>
          </div>
          <small>
            {item.message?.timestamp &&
              new Date(item.message.timestamp).toLocaleTimeString("en")}
          </small>
        </span>
      </span>

      {/* Mobile */}
      <Link
        className={clsx(
          "flex cursor-pointer transition-all active:scale-95 lg:hidden w-full p-2  gap-4",
          {
            "bg-blue-500/20": item.status == "unread",
          }
        )}
        prefetch
        href={`/teacher/chats/${item.id}`}
      >
        <Avatar>
          <AvatarImage src={item.user.profile} alt={`@${item.user.name}`} />
          <AvatarFallback className="uppercase">
            {item.user.name.charAt(0) + item.user.lastname.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="flex flex-wrap gap-4  w-full">
          <div>
            <h1>{item.user.name + " " + item.user.lastname}</h1>
            <small>
              {item.message?.message &&
                item.message.message?.slice(0, 30) + "..."}
            </small>
          </div>
          <small>
            {item.message?.timestamp &&
              new Date(item.message.timestamp).toLocaleTimeString("en")}
          </small>
        </span>
      </Link>

      <Separator className="" />
    </div>
  );
}
