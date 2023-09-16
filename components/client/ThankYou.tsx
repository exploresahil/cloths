"use client";

import { useRouter } from "next/navigation";

const ThankYou = () => {
  const router = useRouter();
  return (
    <div className="thankyou-container">
      <div className="bg-container" />
      <div className="info-container">
        <h3>Thank you for your purchase!</h3>
        <div className="buttons-container">
          <button type="button" onClick={() => router.push("/products")}>
            Continue Shopping
          </button>
          <button>Go to your Account</button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
