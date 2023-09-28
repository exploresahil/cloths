import { SHA256, enc } from "crypto-js";
import axios from "axios";

export async function POST(request: Request) {
  //const price = (await getProduct(request.url.split("/").at(-1) || "")).price;
  //console.log(price + 0.00);
  const { price, phoneNo, order_id } = await request.json();
  const payload = {
    merchantId: "PGTESTPAYUAT140",
    transactionId: `TKP-${order_id}`.slice(0, 37),
    merchantUserId: "PGTESTPAYUAT140",
    //amount: parseFloat(`${price}.00`) * 100,
    // method: "POST",
    amount: parseFloat(`${price}`) * 100,

    mobileNumber: phoneNo,
    // paymentInstrument: {
    //   type: "PAY_PAGE",
    // },
  };
  let data = Buffer.from(JSON.stringify(payload), "utf-8");
  // console.log(data.toString("base64"));
  let api_endpoint = "/v4/debit";
  let salt_key = process.env.NEXT_PRIVATE_PHONEPE_SALT_KEY;
  let salt_index = process.env.NEXT_PRIVATE_SALT_INDEX;
  let res = await axios.post(
    "https://mercury-uat.phonepe.com/v4/debit",
    {
      request: data.toString("base64"),
    },
    {
      headers: {
        "X-VERIFY":
          SHA256(
            `${data.toString("base64")}${api_endpoint}${salt_key}`
          ).toString() +
          "###" +
          salt_index,
        "X-REDIRECT-URL": `http://localhost:3000/thankyou`,
        "X-REDIRECT-MODE": "GET",
        "X-CALLBACK-URL": `http://localhost:3000/api/paymentConfrom/${order_id}`,
        "X-CALL-MODE": "POST",
      },
    }
  );
  return new Response(JSON.stringify(res.data));
}
