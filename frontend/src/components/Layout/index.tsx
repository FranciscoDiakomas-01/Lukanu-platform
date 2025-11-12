"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import {
  BanknoteArrowDownIcon,
  Clapperboard,
  Gem,
  Menu,
  MessageCircle,
  PackageOpen,
  PiggyBank,
  ShoppingBag,
  ShoppingCart,
  Video,
} from "lucide-react";

import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  PiggyBankIcon,
  Search,
  Settings,
  User2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
interface LayoutProp {
  children: React.ReactNode;
  whoIs: "seller" | "admin" | "teacher";
}

export default function DashBoardLayout({ children, whoIs }: LayoutProp) {
  const sellerLinks = [
    {
      title: "Livros",
      to: "/seller",
      icon: <PackageOpen className="transition-all" size={20} />,
    },
    {
      title: "Cursos",
      to: "/seller/courses",
      icon: <Clapperboard className="transition-all" size={20} />,
    },
    {
      title: "Pagamentos",
      to: "/seller/payments",
      icon: <ShoppingCart className="transition-all" size={20} />,
    },
  ];
  const { theme } = useTheme();
  const [active, setActive] = useState(0);
  ("flex w-full  flex-col cursor-pointer gap-1 justify-center items-center");
  const router = useRouter();
  const Links = whoIs == "admin" ? [] : sellerLinks;

  return (
    <main className="flex flex-col lg:items-end">
      <Toaster
        className="z-[9999999999999999]"
        theme={theme == "dark" ? "dark" : "light"}
      />
      <Sidebar whoIs={whoIs} />
      <section className="lg:w-[87%] w-full pb-20 lg:pb-0">{children}</section>
      <nav className="z-9999 bg-transparent backdrop-blur-3xl border border-t-white/10 py-3 px-5 flex gap-1 fixed bottom-0 w-full lg:hidden ">
        {Links.map((item, index) => (
          <Link
            className={clsx(
              "flex w-full  flex-col cursor-pointer gap-1 justify-center items-center",
              {
                "bg-white/10 rounded-sm p-2.5": index == active,
              }
            )}
            prefetch
            key={index}
            href={item.to}
            onClick={() => {
              setActive(index);
            }}
          >
            {item.icon}
            <small className="text-sm ">{item.title}</small>
          </Link>
        ))}
      </nav>
    </main>
  );
}
