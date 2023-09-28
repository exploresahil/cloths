import DB from "./Backend.client";

export const getUser = async () => {
  let data = await DB.auth.getUser();
  const da = await DB.from("USER").select("*").eq("user", data.data.user?.id);
  if (da.data?.length == 0) {
    await DB.from("Redux").insert({
      Redux: {
        CardReducer: {
          value: [],
        },
        userSlice: {
          value: [],
        },
      },
      user: da.data.at(0).id,
    });
    await DB.from("USER").insert({
      user: data.data.user?.id,
    });
  }

  localStorage.setItem(
    "userData",
    JSON.stringify({ data: data.data.user, extra_data: da.data?.at(0) })
  );
  return { data: data.data.user, extra_data: da.data?.at(0) };
};

export const googleLogin = async () => {
  const data = await DB.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "/user",
    },
  });
  await getUser();
};
export const EmailLogin = async (emailId: string, password: string) => {
  return await DB.auth.signUp({
    email: emailId,
    password: password,
  });
};

export const SignOut = async () => {
  await DB.auth.signOut({
    scope: "global",
  });
};

export const updateRedx = async (id: string, data: any) => {
  let d = await DB.from("Redux").select("*").eq("user", id);
  if (d.data?.length == 0) {
    await DB.from("Redux").insert({ Redux: data, user: id });
  } else await DB.from("Redux").update({ Redux: data }).eq("user", id);
};
export const updateCardRedx = async (id: string) => {
  let d = await DB.from("Redux").select("*").eq("user", id);
  if (d.data)
    await DB.from("Redux")
      .update({
        Redux: { ...d.data[0].Redux, CardReducer: { value: [] } },
      })
      .eq("user", id);
};
export const updateUserRedx = async (id: string, UserAddress: any) => {
  return;
};
export const getRedx = async (id: string) => {
  return await DB.from("Redux").select("*").eq("user", id);
};
