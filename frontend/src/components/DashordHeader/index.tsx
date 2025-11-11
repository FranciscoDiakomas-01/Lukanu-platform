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
  Users,
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
import useIsAdmin from "@/hooks/useIsAdmin";
interface Props {
  whoIs: "seller" | "admin" | "teacher";
  showInput: boolean;
  placeholder?: string;
}

export default function DashordHeader(prop: Props) {
  const { user } = useContext(UserContext) as { user: User };
  const { isAdmin } = useIsAdmin();
  const [isDark, setIsDark] = useState(false);
  const adminLinks = [
    {
      title: "Inscrições",
      to: "/seller/courses",
      icon: <Clapperboard className="transition-all" size={18} />,
    },
    {
      title: "Usuários",
      to: "/seller/users",
      icon: <Users className="transition-all" size={18} />,
    },
    {
      title: "Saques",
      to: "/seller/cacheout",
      icon: <PiggyBank className="transition-all" size={18} />,
    },
    {
      title: "Perfil",
      to: "/seller/settings",
      icon: <Settings className="transition-all" size={18} />,
    },
  ];
  const sellerLinks = [
    {
      title: "Saques",
      to: "/seller/cacheout",
      icon: <PiggyBank className="transition-all" size={18} />,
    },
    {
      title: "Afiliações",
      to: "/seller/aff",
      icon: <BanknoteArrowDown className="transition-all" size={18} />,
    },
    {
      title: "Perfil",
      to: "/seller/settings",
      icon: <Settings className="transition-all" size={18} />,
    },
  ];

  const router = useRouter();
  const Links = isAdmin ? adminLinks : sellerLinks;

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
        <Link href={"/seller/notifications"} prefetch>
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
        <div className="flex">
          <Avatar>
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
                <span
                  className="flex flex-col  dark:text-white 
                "
                >
                  <p>{user.firstName + " " + user.lastName}</p>
                  <small className="text-[11px] ">{user.email}</small>
                </span>
                <ChevronDown size={14} className="dark:text-white" />
              </MenubarTrigger>
              <MenubarContent className="bg-transparent dark:text-black border-white/10  backdrop-blur-2xl flex flex-col gap-3 ">
                {Links.map((item, idx) => (
                  <Link key={idx} href={item.to}>
                    <MenubarItem className="flex cursor-pointer">
                      {item.icon}
                      {item.title}
                    </MenubarItem>
                  </Link>
                ))}

                <Link href={"https://www.youtube.com/@Lukanu-v"}>
                  <MenubarItem className="flex cursor-pointer">
                    <HelpCircle size={14} />
                    Ajuda
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
                {Links.map((item, idx) => (
                  <Link key={idx} href={item.to}>
                    <MenubarItem className="flex cursor-pointer">
                      {item.icon}
                      {item.title}
                    </MenubarItem>
                  </Link>
                ))}
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
