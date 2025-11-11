"use client";

import { useEffect, useState } from "react";

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("REGULAR");
  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role as string);
    if (role == "ADMIN") {
      setIsAdmin(true);
    }
  }, []);

  return {
    isAdmin,
    role,
  };
}
