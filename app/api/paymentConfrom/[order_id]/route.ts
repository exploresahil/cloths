import { ConfromPay } from "@/backend/Order";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: any) {
  const order_id = params.order_id;
  const FormData = await request.formData();
  console.log(FormData.get("code"));

  if (FormData.get("code") == "PAYMENT_SUCCESS") {
    const data = await ConfromPay(order_id);
    console.log(data);

    const res = new Response(`
    <html>
    <body>
    <script>
    window.location.href = "/thankyou"
    </script>
    </body>
    </html>
    
    `);
    res.headers.set("Content-Type", "text/html; charset=utf-8");
    return res;
  }
  // work On sanity
  return new Response("ok");
}
