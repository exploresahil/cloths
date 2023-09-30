"use client";

import supabase from "@/backend/Backend.client";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const userData = useAppSelector((state) => state.userDataSlice.value);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //console.log(userData);

  useEffect(() => {
    if (userData.data.user!) {
      if (userData.extra_data.super_admin === true) {
        setIsAuthenticated(true);
      } else {
        router.push("/");
      }
    }
  }, [userData]);

  return isAuthenticated ? <>{children}</> : <p>loading..</p>;
}
