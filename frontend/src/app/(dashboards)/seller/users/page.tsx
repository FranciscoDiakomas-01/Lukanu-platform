"use client";

import DashordHeader from "@/components/DashordHeader";
import UserClientService from "@/service/User";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<UserClientService>();

  useEffect(() => {

    const token = localStorage.getItem("aces")
  }, []);
  return (
    <main className="w-full">
      <DashordHeader whoIs="seller" showInput={false} />
    </main>
  );
}
