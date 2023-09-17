import SuperBase from "@/backend/Backend.client";

export const AddCartOrder = (
  product: any,
  user_id: string,
  how_many: number
) => {
  return SuperBase.from("Cart").insert({
    how_many,
    product: product,
    user: user_id,
  });
};
export const RemoveCartOrder = (id: string) => {
  return SuperBase.from("Cart").delete().eq("id", id);
};
export const UpdateCartOrder = (id: string, data: any) => {
  return SuperBase.from("Cart").update(data).eq("id", id).select("*");
};

export const getProCart = (id: string) => {
  return SuperBase.from("Cart").select("*").eq("user", id);
};
