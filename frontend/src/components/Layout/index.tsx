"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
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
      title: "Vendas",
      to: "/seller/payments",
      icon: <ShoppingCart className="transition-all" size={20} />,
    },
    {
      title: "Saques",
      to: "/seller/checkout",
      icon: <PiggyBank className="transition-all" size={20} />,
    },
    {
      title: "Compras",
      to: "/seller/buys",
      icon: <ShoppingBag className="transition-all" size={20} />,
    },
    {
      title: "Afiliações",
      to: "/seller/buys",
      icon: <BanknoteArrowDownIcon className="transition-all" size={20} />,
    },
  ];
  const router = useRouter();
  const Links = whoIs == "admin" ? [] : sellerLinks;
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    localStorage.setItem("theme", theme);
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);

  return (
    <main className="flex flex-col lg:items-end">
      <Sidebar whoIs={whoIs} />
      <section className="lg:w-[87%] w-full">{children}</section>
      <nav className="z-[99999] bg-transparent backdrop-blur-3xl border border-t-white/10 py-3 px-1 flex gap-1 fixed bottom-0 w-full lg:hidden ">
        {Links.map((item, index) => (
          <Link
            className="flex w-full  flex-col cursor-pointer gap-1 justify-center items-center"
            key={index}
            href={item.to}
          >
            {item.icon}
            <small className="text-sm md:flex hidden">{item.title}</small>
          </Link>
        ))}
      </nav>
    </main>
  );
}
