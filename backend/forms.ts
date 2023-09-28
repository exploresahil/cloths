import db from "./Backend.client";

export const Newsletter = async (
  fname: string,
  lname: string,
  email: string
) => {
  return await db
    .from("Newsletter")
    .insert({
      first_name: fname,
      last_name: lname,
      email: email,
    })
    .select("*");
};
export const contact = async (
  fname: string,
  lname: string,
  email: string,
  message: string
) => {
  return await db
    .from("contact")
    .insert({
      first_name: fname,
      last_name: lname,
      email: email,
      message,
    })
    .select("*");
};
