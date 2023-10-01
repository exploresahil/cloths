"use client";

import { useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/backend/User";
import { useAppDispatch } from "@/redux/hook";
import { addUserData } from "@/redux/reducer/userData";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const userData = useAppSelector((state) => state.userDataSlice.value);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //console.log(userData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getUser().then((data) => {
      if (data?.data.user) {
        setIsAuthenticated(true);
      } else {
        router.push("/");
      }
    });
  }, []);

  return isAuthenticated ? <>{children}</> : <p>loading..</p>;
}
