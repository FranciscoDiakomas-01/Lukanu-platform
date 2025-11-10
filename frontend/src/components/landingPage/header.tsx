"use client";
import clsx from "clsx";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import nubla from "@/constants/nubla";
import logo from "@/assets/logo.png";
export default function Header() {
  const navigation = [
    { name: "Inicio", href: "#" },
    { name: "Sobre", href: "#about" },
    { name: "Benefícios", href: "#benefis" },
    { name: "Como funciona", href: "#integration" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const router = useRouter();
  return (
    <header className="fixed bg-transparent backdrop-blur-sm inset-x-0 top-0 z-50 border-b-white/10 border-b ">
      <nav
        aria-label="Global"
        className="flex items-center py-3  justify-between px-8"
      >
        <div className="flex lg:flex-1">
          <a
            href="#"
            className="-m-1.5 p-1.5 flex items-center gap-1 text-white font-semibold"
          >
            <img src={logo.src} alt="4ride" className="h-[40px] w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 border-x border-white/10 px-4">
          {navigation.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className={clsx("text-sm/6 transition-all ", {
                "text-blue-500": index == active,
                "text-white": index != active,
              })}
              onClick={() => {
                setActive(index);
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden gap-3 lg:flex lg:flex-1 lg:justify-end ">
          <button
            className="text-sm/6 font-semibold text-white  border border-white/10 rounded-lg px-3 py-1.5 min-w-[90px] flex justify-center items-center 
            "
            onClick={() => {
              router.push(nubla);
            }}
          >
            Entrar
          </button>
          <button
            className="text-sm/6 font-semibold text-white  border-gray-900/10 bg-blue-500 rounded-lg px-3 py-1.5 
            "
            onClick={() => {
              router.push(nubla);
            }}
          >
            Criar conta
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        onClick={() => {
          setMobileMenuOpen(false);
        }}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="-m-1.5 p-1.5"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <img src={logo.src} alt="4ride" className="h-[70px] w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Fechar menu</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white  hover:bg-blue-500/10"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6 flex flex-col gap-4">
                <a
                  className="text-sm/6 font-semibold text-white  border border-white/10 rounded-lg px-3 py-1.5 w-full flex justify-center items-center 
            "
                  onClick={() => {
                    router.push(nubla);
                  }}
                >
                  Entrar
                </a>
                <a
                  className="text-sm/6 font-semibold text-white   bg-blue-500 rounded-lg px-3 py-1.5  w-full  flex justify-center items-center
            "
                  onClick={() => {
                    router.push(nubla);
                  }}
                >
                  Criar conta
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
