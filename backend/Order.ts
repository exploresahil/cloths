import SuperBase from "@/backend/Backend.client";

export const makeOrder = async (product: JSON, user: any): Promise<any> => {
  return await SuperBase.from("Order")
    .insert({
      product: product,
      user: user.id,
      cancel: false,
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
export const UpdateOrder = async (order_id: string, updateObject: any) => {
  return await SuperBase.from("Order").update(updateObject).eq("id", order_id);
};
export const getOrders = (user_id: string) => {
  return SuperBase.from("Order").select("*").eq("user", user_id);
};
export const getOrdersId = (order_id: string) => {
  return SuperBase.from("Order").select("id").eq("id", order_id);
};
