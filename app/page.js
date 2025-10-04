"use client";
import { use, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    // window.location.href = "/poke";
    redirect("/poke");
  }, []);
  return <h1>Loading...</h1>;
}
