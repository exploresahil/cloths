import { Users } from "@/types";
import DB from "./Backend.client";
import CDB from "@/storeage";
export const getUser = async (): Promise<Users> => {
  let data = await DB.auth.getSession();
  const da = await DB.from("USER")
    .select("*")
    .eq("user", data.data.session?.user?.id);
  if (da.data?.length == 0) {
    await DB.from("USER").insert({
      user: data.data.session?.user.id,
    });
    const _da = await DB.from("USER")
      .select("*")
      .eq("user", data.data.session?.user?.id);
    console.log(_da.data?.at(0));

    await DB.from("Redux")
      .insert({
        Redux: {
          CardReducer: {
            value: [],
          },
          userSlice: {
            value: [],
          },
        },
        user: _da.data?.at(0).id,
      })
      .then(() => null);
  }
  const __da = await DB.from("USER")
    .select("*")
    .eq("user", data.data.session?.user?.id);

  if (data.data.session?.user && __da.data?.length != 0) {
    await CDB.setItem<Users>("user-data", {
      data: { user: data.data.session.user },
      extra_data: __da.data?.at(0),
    });

    return {
      data: { user: data.data.session.user },
      extra_data: __da.data?.at(0),
    };
  } else {
    return {
      data: { user: null },
      extra_data: __da.data?.at(0),
    };
  }
};

export const googleLogin = async () => {
  const data = await DB.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.host}/user`,
    },
  });
  await getUser().then((data) => {
    console.log(data);
  });
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
        Redux: { CardReducer: { value: [] }, ...d.data[0].Redux },
      })
      .eq("user", id);
};
export const updateUserRedx = async (id: string, UserAddress: any) => {
  return;
};
export const getRedx = async (id: string) => {
  return await DB.from("Redux").select("*").eq("user", id);
};
