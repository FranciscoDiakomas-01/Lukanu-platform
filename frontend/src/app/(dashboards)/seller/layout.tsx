"use client";

import DashBoardLayout from "@/components/Layout";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashBoardLayout whoIs="seller">{children}</DashBoardLayout>;
}
