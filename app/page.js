"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    // Use client-side redirect
    redirect("/poke");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}
