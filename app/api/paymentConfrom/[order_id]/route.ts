import { ConfromPay } from "@/backend/Order";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: any) {
  const order_id = params.order_id;
  const data = await ConfromPay(order_id);
  // work On sanity
  return NextResponse.redirect("http://localhost:3000/thankyou");
}
