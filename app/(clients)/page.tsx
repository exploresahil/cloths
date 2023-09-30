"use client"
import Process from "@/components/client/Process";
import Newsletter from "@/components/client/NewsLetter";
import Hero from "@/components/client/Hero";
import ThankYou from "@/components/client/ThankYou";
import { useEffect } from "react"
import { getUser } from "@/backend/User";
import { useAppDispatch } from "@/redux/hook"
import { addUserData } from "@/redux/reducer/userData"
export default function Home() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    getUser().then((data) => {
      dispatch(addUserData(data))
    })
  }, [])
  return (
    <>
      <Hero />
      <Process />
      <Newsletter />
    </>
  );
}
