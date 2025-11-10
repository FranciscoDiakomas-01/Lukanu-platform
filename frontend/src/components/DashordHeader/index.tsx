"use cleint";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
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
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Props {
  whoIs: "seller" | "admin" | "teacher";
  showInput: boolean;
  placeholder?: string;
}

export default function DashordHeader(prop: Props) {
  const User = {
    name: "Francisco",
    lastname: "Diakomas",
    email: "francisco@gmail.com",
  };

  const [isDark, setIsDark] = useState(false);
  const adminLinks = [
    {
      title: "",
      to: "",
      icon: "",
    },
  ];
  const sellerLinks = [
    {
      title: "Livros",
      to: "/seller",
      icon: <PackageOpen className="transition-all" size={18} />,
    },
    {
      title: "Cursos",
      to: "/seller/courses",
      icon: <Clapperboard className="transition-all" size={18} />,
    },
    {
      title: "Vendas",
      to: "/seller/payments",
      icon: <ShoppingCart className="transition-all" size={18} />,
    },
    {
      title: "Saques",
      to: "/seller/checkout",
      icon: <PiggyBank className="transition-all" size={18} />,
    },
    {
      title: "Compras",
      to: "/seller/buys",
      icon: <ShoppingBag className="transition-all" size={18} />,
    },
  ];
  const teacherLinks = [
    {
      title: "Turmas",
      to: "/teacher",
      icon: <Video className="transition-all" size={18} />,
    },
    {
      title: "Conversas",
      to: "/teacher/chats",
      icon: <MessageCircle className="transition-all" size={18} />,
    },
  ];

  const router = useRouter();
  const Links =
    prop.whoIs == "admin"
      ? adminLinks
      : prop.whoIs == "seller"
      ? sellerLinks
      : teacherLinks;

  useEffect(() => {
    const html = document.documentElement;
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      html.classList.add("dark");
      setIsDark(true);
    } else {
      html.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  function toggleDarkMode() {
    const html = document.documentElement;
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }
  return (
    <header className="w-full sticky top-0 z-[40]  p-2 lg:justify-between justify-end lg:items-center   gap-4 border-b backdrop-blur-2xl dark:border-white/10  grid grid-cols-2 ">
      <div>
        {prop.showInput && (
          <form className="lg:w-[50%] lg:flex hidden   py-1 px-1 border-black/10 items-cente relative">
            <Input
              className="w-full"
              placeholder={prop.placeholder ?? "Buscar ..."}
            />
            <Search size={16} className="absolute right-3 top-3" />
          </form>
        )}
      </div>
      <div className="flex justify-end items-center gap-3">
        <Link
          href={
            prop.whoIs == "admin"
              ? "/admin/notifications"
              : prop.whoIs == "seller"
              ? "/seller/notifications"
              : "/teacher/notifications"
          }
          prefetch
        >
          <span className=" justify-center flex items-center w-8  font-semibold rounded-full border dark:border-white/10 h-8">
            <Bell size={14} />
          </span>
        </Link>
        <div className="flex gap-3">
          <Avatar className="md:flex hidden">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold">
              {User.name?.charAt(0) + User.lastname?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <Menubar
            className="border-none flex
           md:hidden shadow-none bg-transparent"
          >
            <MenubarMenu>
              <MenubarTrigger className="font-sans  text-start gap-3">
                <Avatar className="lg:hidden flex">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold">
                    {User.name?.charAt(0) + User.lastname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={14} className="dark:text-white" />
              </MenubarTrigger>
              <MenubarContent className="bg-transparent dark:text-black border-white/10 backdrop-blur-2xl flex flex-col gap-3 ">
                {Links.map((item, index) => (
                  <Link
                    className="flex w-full cursor-pointer"
                    key={index}
                    href={item.to}
                  >
                    <MenubarItem className="flex w-full items-center gap-2">
                      {item.icon}
                      {item.title}
                    </MenubarItem>
                  </Link>
                ))}

                <Link
                  href={
                    prop.whoIs == "admin"
                      ? "/admin/settings"
                      : prop.whoIs == "seller"
                      ? "/seller/settings"
                      : "/teacher/settings"
                  }
                >
                  <MenubarItem className="flex cursor-pointer">
                    <Settings size={14} />
                    Configurações
                  </MenubarItem>
                </Link>

                <a href={"https://www.youtube.com/@Lukanu-v"}>
                  <MenubarItem className="flex cursor-pointer">
                    <HelpCircle size={14} />
                    Ajuda
                  </MenubarItem>
                </a>

                <div className="flex px-2 my-2 items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    checked={isDark}
                    onCheckedChange={() => {
                      toggleDarkMode();
                    }}
                  />
                  <Label htmlFor="airplane-mode" className="dark:text-white">
                    {isDark ? "Modo claro" : "Modo escuro"}
                  </Label>
                </div>

                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <LogOut />
                  <p>Sair</p>
                </Button>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Menubar
            className="border-none hidden
           md:flex shadow-none bg-transparent"
          >
            <MenubarMenu>
              <MenubarTrigger className="font-sans  text-start gap-3">
                <span
                  className="flex flex-col dark:text-white
                "
                >
                  <p>{User.name + " " + User.lastname}</p>
                  <small className="text-[11px] ">{User.email}</small>
                </span>
                <ChevronDown size={14} className="dark:text-white" />
              </MenubarTrigger>
              <MenubarContent className="bg-transparent dark:text-white border-white/10 backdrop-blur-2xl ">
                <Link
                  href={
                    prop.whoIs == "admin"
                      ? "/admin/settings"
                      : prop.whoIs == "seller"
                      ? "/seller/settings"
                      : "/teacher/settings"
                  }
                >
                  <MenubarItem className="flex cursor-pointer">
                    <Settings size={14} />
                    Configurações
                  </MenubarItem>
                </Link>

                <a href={"https://www.youtube.com/@Lukanu-v"}>
                  <MenubarItem className="flex cursor-pointer">
                    <HelpCircle size={14} />
                    Ajuda
                  </MenubarItem>
                </a>

                <div className="flex px-2 my-2 items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    checked={isDark}
                    onCheckedChange={() => {
                      toggleDarkMode();
                    }}
                  />
                  <Label htmlFor="airplane-mode" className="dark:text-white">
                    {isDark ? "Modo claro" : "Modo escuro"}
                  </Label>
                </div>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  );
}
