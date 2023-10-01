"use client";
import Process from "@/components/client/Process";
import Newsletter from "@/components/client/NewsLetter";
import Hero from "@/components/client/Hero";
import ThankYou from "@/components/client/ThankYou";
import { useEffect } from "react";
import { getUser } from "@/backend/User";
import { useAppDispatch } from "@/redux/hook";
import { addUserData, _reset as reset } from "@/redux/reducer/userData";
import { reset as Reset } from "@/redux/reducer/userSlice";
import { reset as _reset } from "@/redux/reducer/cartSlice";
export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getUser().then((data) => {
      //console.log("data----->", data);

      if (data) dispatch(addUserData(data));
      else {

        dispatch(reset())
        dispatch(Reset())
        dispatch(_reset())

      }
    });
  }, []);
  return (
    <>
      <Hero />
      <Process />
      <Newsletter />
    </>
  );
}
