"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";

interface LayoutProp {
  children: React.ReactNode;
  whoIs: "seller" | "admin" | "teacher";
}

export default function DashBoardLayout({ children, whoIs }: LayoutProp) {
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
    </main>
  );
}
