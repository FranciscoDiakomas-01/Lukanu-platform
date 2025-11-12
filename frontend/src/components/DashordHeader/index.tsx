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
  BanknoteArrowDown,
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
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";
import type { User } from "@/types/User";
import clsx from "clsx";
import UserClientService from "@/service/User";
interface Props {
  whoIs: "seller" | "admin" | "teacher";
  showInput: boolean;
  placeholder?: string;
}

export default function DashordHeader(prop: Props) {
  const { user } = useContext(UserContext) as { user: User };
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
      title: "Afiliações",
      to: "/seller/afiliates",
      icon: <BanknoteArrowDownIcon className="transition-all" size={20} />,
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
    <header className="w-full sticky top-0 z-40  p-2 lg:justify-between justify-end lg:items-center   gap-4 border-b backdrop-blur-2xl dark:border-white/10  ">
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
          <span
            className={clsx(
              "justify-center flex items-center w-8  font-semibold rounded-full  h-8",
              {
                "animate-pulse hover:animate-none":
                  user?.totalUnreadNotification &&
                  user?.totalUnreadNotification > 0,
              }
            )}
            onClick={async () => {
              const token = localStorage.getItem("acess");
              const service = new UserClientService(token as string);
              await service.notifications(1);
            }}
          >
            <Bell size={14} />
            {Number(user?.totalUnreadNotification) > 0 && (
              <sup className="bg-primary text-[10px] w-5 h-4 rounded-md flex justify-center items-center dark:text-white text-black">
                {user?.totalUnreadNotification}
              </sup>
            )}
          </span>
        </Link>
        <div className="flex gap-3">
          <Avatar className="md:flex hidden ">
            <AvatarImage
              src={user?.profileUrl}
              alt={user.firstName + user.lastName}
            />
            <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold">
              {user.firstName?.charAt(0) + user.lastName?.charAt(0)}
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
                    src={user?.profileUrl}
                    alt={user.firstName + user.lastName}
                  />
                  <AvatarFallback className="dark:bg-white bg-[#080808] text-white dark:text-black justify-center flex items-center w-10 uppercase font-semibold">
                    {user.firstName?.charAt(0) + user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={14} className="dark:text-white" />
              </MenubarTrigger>
              <MenubarContent className="bg-transparent dark:text-black border-white/10  backdrop-blur-2xl flex flex-col gap-3 ">
                <span
                  className="flex flex-col dark:text-white text-center
                "
                >
                  <p>{user.firstName + " " + user.lastName}</p>
                  <small className="text-[11px] ">{user.email}</small>
                </span>
                <Link href={prop.whoIs + "/settings"}>
                  <MenubarItem className="flex cursor-pointer">
                    <Settings size={14} />
                    Configurações
                  </MenubarItem>
                </Link>

                <Link href={"/seller/cacheout"}>
                  <MenubarItem className="flex cursor-pointer">
                    <PiggyBank size={14} />
                    Saques
                  </MenubarItem>
                </Link>

                <Link href={"https://www.youtube.com/@Lukanu-v"}>
                  <MenubarItem className="flex cursor-pointer">
                    <HelpCircle size={14} />
                    Ajuda
                  </MenubarItem>
                </Link>

                <Link href={"/seller/aff"}>
                  <MenubarItem className="flex cursor-pointer">
                    <BanknoteArrowDown size={14} />
                    Afiliações
                  </MenubarItem>
                </Link>

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
                    localStorage.clear();
                    router.push("/enter");
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
                  className="flex flex-col  dark:text-white 
                "
                >
                  <p>{user.firstName + " " + user.lastName}</p>
                  <small className="text-[11px] ">{user.email}</small>
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
