"use client";

import DashordHeader from "@/components/DashordHeader";
import ShinyText from "@/components/animated/ShineText/indext";
import CreateEbookForm from "./ebook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function createEbook() {
  const [token, setToken] = useState("");
  const router = useRouter();
  useEffect(() => {
    const acess = localStorage.getItem("acess");

    if (!acess) {
      router.push("/");
      localStorage.clear();
      return;
    }
    setToken(acess);
  }, []);
  return (
    <main className="w-full pb-20   flex-col min-h-screen flex gap-4">
      <DashordHeader whoIs="seller" showInput={false} />
      <span className="px-4 flex flex-col pb-20 lg:w-[50%] place-self-center w-full">
        <div className="flex justify-center items-center w-full">
          <ShinyText
            text="Cadastro de livro"
            className="text-center lg:text-3xl text-2xl mb-4"
          />
        </div>
        <CreateEbookForm token={token} />
      </span>
    </main>
  );
}
