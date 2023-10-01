import { ConformPay } from "@/backend/Order";
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import clientConfig from "@/sanity/config/client-config";

export async function POST(request: Request, { params }: any) {
  const order_id = params.order_id;
  const FormData = await request.formData();
  console.log(FormData.get("code"));

  if (FormData.get("code") == "PAYMENT_SUCCESS") {
    const data = await ConformPay(order_id);

    //console.log("ordered --->", data.data.product[0].product.order_id);

    const client = createClient({
      ...clientConfig,
      token:
        "sktJkuYa5pdMqisAbC1sJqD3Fq4FbpDaIs4Q1gu38y1nef1AqVIhY60Ek6kRIYO8y27hXmwSCSjChC35KrQm7XaFYKHmr66HsIhINiiBXNJP7mIvME7qqap1IBMHddusz3DAx7BlIchbEhyLiiJjdpW3ycAD81nF1nl0RoKf2iSbYvHV77gM",
    });

    const orders = data.data.product.map(async (product: any) => {
      //console.log(product.product);
      return await client
        .patch(product.product._id)
        .set({ isAvailable: false })
        .commit();
    });
    console.log(orders);

    /* client.patch(data.data.product.product._id) */

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
