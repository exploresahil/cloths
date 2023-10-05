import { ConformPay } from "@/backend/Order";
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import clientConfig from "@/sanity/config/client-config";
import { products } from "@/types/Products";
import { Order } from "@/types";
import { client2 } from "@/backend/Backend.client";

export async function POST(request: Request, { params }: any) {
  try {
    const order_id = params.order_id;
    const FormData = await request.formData();
    await client2.from("ADMIN_LOGS").insert({
      LEVEL: "INFO",
      LOG: "PAYMENT-CONFORM-RUN ORDER_ID-" + order_id,
    });

    console.log();
    await client2.from("ADMIN_LOGS").insert({
      LEVEL: "INFO",
      LOG: FormData.get("code")?.toString() + " ORDER_ID-" + order_id,
    });
    if (FormData.get("code") == "PAYMENT_SUCCESS") {
      client2.from("ADMIN_LOGS").insert({
        LEVEL: "INFO",
        LOG: "PAYMENT SUCCESS ORDER_ID-" + order_id,
      });
      const data = await ConformPay(order_id);
      await client2.from("ADMIN_LOGS").insert({
        LEVEL: "INFO",
        LOG: `${JSON.stringify(data.data)}` + "data return into ConformPay",
      });
      //console.log("ordered --->", data.data.product[0].product.order_id);

      const client = createClient({
        ...clientConfig,
        token: process.env.NEXT_SANITY_TOKEN,
      });

      const orders = await data.data.product.map(
        async (product: {
          id: number;
          product: products;
          how_many: number;
          created_at: string;
        }) => {
          console.log(product);
          return await client
            .patch(product.product._id)
            .set({ isAvailable: false })
            .commit();
        }
      );
      await client2.from("ADMIN_LOGS").insert({
        LEVEL: "INFO",
        LOG: `${JSON.stringify(orders)}` + "order getting isAvailable : false",
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
  } catch (e) {
    await client2.from("ADMIN_LOGS").insert({
      LEVEL: "Error",
      LOG: JSON.stringify(e),
    });
  }
}
