import SuperBase, { client2 } from "@/backend/Backend.client";

export const makeOrder = async (
  product: JSON[],
  user: any,
  data: any
): Promise<any> => {
  return await SuperBase.from("Order")
    .insert({
      product: product,
      user: user,
      cancel: false,
      ...data,
    })
    .select();
};
export const CancelOrder = async (order_id: string) => {
  return await SuperBase.from("Order")
    .update({
      cancel: true,
    })
    .eq("id", order_id);
};
export const ConformPay = async (id: string) =>
  await client2
    .from("Order")
    .update({ payment_confirm: true })
    .eq("id", id)
    .select("*")
    .single();

export const UpdateOrder = async (order_id: string, updateObject: any) => {
  return await SuperBase.from("Order").update(updateObject).eq("id", order_id);
};
export const getOrders = (user_id: string) => {
  return SuperBase.from("Order").select("*").eq("user", user_id);
};
export const getOrdersId = (order_id: string) => {
  return SuperBase.from("Order").select("id").eq("id", order_id);
};
