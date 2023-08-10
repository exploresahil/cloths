import DB from "./Backend.client";

export const getUser = async () => {
    let data = await DB.auth.getUser();
    const da = await DB.from("USER").select("*").eq("user", data.data.user?.id);
    if (da.data?.length == 0) {
        await DB.from("USER").insert({
            user: data.data.user?.id,
            address: ""
        })
    }

    localStorage.setItem("userData", JSON.stringify({ data: data.data.user, extra_data: da.data?.at(0) }));
    return { data: data.data.user, extra_data: da.data?.at(0) }
}

export const googleLogin = async () => {
    const data = await DB.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: "/user"
        }
    });
    await getUser();

}
export const EmailLogin = async (emailId: string, password: string, phoneNo: string) => {

    return await DB.auth.signUp({
        email: emailId,
        phone: phoneNo,
        password: password
    });
}

export const SignOut = async () => {
    await DB.auth.signOut({
        scope: "global"
    })
}