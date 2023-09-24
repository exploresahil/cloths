"use client";

import { useAppSelector } from "@/redux/hook";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const count = useAppSelector((state) => state.CardReducer.value);

  if (!count || count.length === 0) {
    return null;
  }
  return <>{children}</>;
}
