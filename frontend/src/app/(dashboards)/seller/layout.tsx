"use client";

import DashBoardLayout from "@/components/Layout";
import UserContextComponent from "@/context/userContext";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserContextComponent>
      <DashBoardLayout whoIs="seller">{children}</DashBoardLayout>
    </UserContextComponent>
  );
}
