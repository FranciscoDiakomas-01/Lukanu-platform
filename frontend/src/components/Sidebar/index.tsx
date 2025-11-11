"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import {
  BanknoteArrowDown,
  Clapperboard,
  Gem,
  HelpCircle,
  LogOut,
  Menu,
  MessageCircle,
  PackageOpen,
  PiggyBank,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
interface Props {
  whoIs: "seller" | "admin" | "teacher";
}
export default function Sidebar(props: Props) {
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
    {
      title: "Afiliações",
      to: "/seller/buys",
      icon: <BanknoteArrowDown className="transition-all" size={18} />,
    },
  ];
  const router = useRouter();
  const Links = props.whoIs == "admin" ? adminLinks : sellerLinks;
  const [active, setActive] = useState(0);
  return (
    <>
      <nav
        className={clsx(
          "lg:flex hidden fixed top-0 left-0 flex-col  z-4  gap-5 transition-all p-3 justify-between overflow-hidde bg- h-screen border-r  dark:border-white/10 bg-transparent backdrop-blur-3xl min-w-[13%] max-w-[13%]"
        )}
      >
        <div className="flex flex-col gap-1 w-full">
          <div className="relative min-h-10">
            <div className=" z-1 dark:bg-white w-5 h-5 top-3  left-2  absolute "></div>
            <div
              className=" z-2 absolute w-full h-full flex text-2xl font-semibold text-cyan-600
         dark:text-white items-end   gap-1 "
            >
              <Image
                className="h-8   rounded-md w-8  object-fill"
                src={logo}
                alt="Logo"
              />
              ukanu
            </div>
          </div>

          <ol className="mt-8 flex flex-col gap-4 w-full">
            {Links.map((item, index) => (
              <Link
                onClick={() => {
                  setActive(index);
                }}
                className={clsx(
                  "flex items-center gap-3  p-3  rounded-sm transition-all  hover:*:first:-rotate-10 border   opacity-50 dark:text-white hover:opacity-100",

                  {
                    "opacity-100 border-cyan-500/80 dark:border-white/10 text-cyan-500":
                      active == index,
                    "border-transparent": active != index,
                  }
                )}
                href={item.to}
                key={index}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </ol>
        </div>
        <div className="w-full flex flex-col gap-4">
          <a
            href={"https://www.youtube.com/@Lukanu-v"}
            onClick={() => {
              setActive(55);
            }}
            className={clsx(
              "flex items-center gap-3  p-3  rounded-sm transition-all  hover:*:first:-rotate-10 border border-transparent  opacity-50 dark:text-white hover:opacity-100",

              {
                "opacity-100 border-cyan-500/80 dark:border-white/10 text-cyan-500":
                  active == 55,
                "border-transparent": active != 55,
              }
            )}
          >
            <HelpCircle className="transition-all" size={18} />
            Ajuda
          </a>

          <Link
            onClick={() => {
              setActive(444);
            }}
            className={clsx(
              "flex items-center gap-3  p-3  rounded-sm transition-all  hover:*:first:-rotate-10 border border-transparent  opacity-50 dark:text-white hover:opacity-100",

              {
                "opacity-100 border-cyan-500/80 dark:border-white/10 text-cyan-500":
                  active == 444,
                "border-transparent": active != 444,
              }
            )}
            href={
              props.whoIs == "admin"
                ? "/admin/settings"
                : props.whoIs == "seller"
                ? "/seller/settings"
                : "/teacher/settings"
            }
          >
            <Settings className="transition-all" size={18} />
            Configurações
          </Link>
          <Button
            onClick={() => {
              router.push("/login");
            }}
            className="w-full h-[43px] dark:bg-red-500/2 dark:border-red-500/10 font-normal border shadow-none dark:dark:text-red-500 dark:hover:text-white dark:hover:*:text-white dark:hover:bg-red-500"
          >
            <LogOut className="dark:text-red-500" size={14} />
            Sair
          </Button>
        </div>
      </nav>

      <div>
        <Link href={Links[0].to}>
          <div className="fixed lg:hidden flex z-[444] top-3.5 cursor-pointer pl-2 hover:animate-none shadow-2xl shadow-blue-500">
            <Image src={logo} alt="logo" className="h-8 w-8" />
          </div>
        </Link>
      </div>
    </>
  );
}
