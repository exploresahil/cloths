"use client";

import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/hook";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const count = useAppSelector((state) => state.CardReducer.value);
  const router = useRouter();

  if (!count || count.length === 0) {
    return (
      <div className="cart-empty">
        <p>Oops! your cart is empty</p>
        <button type="button" onClick={() => router.push("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }
  return <>{children}</>;
}
