"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import type { User } from "@/types/User";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import UserClientService from "@/service/User";
import { toast } from "sonner";

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserContextComponent({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    localStorage.setItem("theme", theme);
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    const token = localStorage.getItem("acess");
    if (!token) {
      localStorage.clear();
      router.push("/enter");
      return;
    }
    const client = new UserClientService(token);
    client
      .getMyData()
      .then((data) => {
        if (data?.hasError || !data?.data?.id) {
          router.replace("/enter");
          localStorage.clear();
          return;
        }
        if (data?.data) {
          setUser(data?.data);
          return;
        }
        return;
      })
      .catch((err) => {
        router.push("/enter");
        toast.error("Consulte a sua internet");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });

    const interval = setInterval(() => {
      client
        .getMyData()
        .then((data) => {
          if (data?.hasError || !data?.data?.id) {
            router.replace("/enter");
            localStorage.clear();
            return;
          }
          if (data?.data) {
            setUser(data?.data);
            return;
          }
          return;
        })
        .catch((err) => {
          router.push("/enter");
          toast.error("Consulte a sua internet");
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {loading ? (
        <div className="flex h-screen justify-center  items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>{children}</>
      )}
    </UserContext.Provider>
  );
}
