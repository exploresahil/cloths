import db from "@/backend/Backend.client";
export async function GET(request: Request) {
  return new Response(JSON.stringify(await db.from("contact").select("*")));
}
