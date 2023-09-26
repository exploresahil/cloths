import { ConfromPay } from "@/backend/Order";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: any) {
  const order_id = params.order_id;
  const FormData = await request.formData();
  console.log(FormData.get("code"));

  if (FormData.get("code") == "PAYMENT_SUCCESS") {
    const data = await ConfromPay(order_id);
    console.log(data);

    return NextResponse.redirect("http://localhost:3000/thankyou");
  }
  // work On sanity
  return NextResponse.redirect("http://localhost:3000/thankyou");
}
