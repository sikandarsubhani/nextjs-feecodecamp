// C:\Users\navee\Desktop\sikandar\Coding\next-app\src\app\profile\page.tsx

"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setdata] = useState("nothing")
  const Logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setdata(res.data.data._id)

  }
  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <p>Profile Page</p>
      <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button onClick={getUserDetails}
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >Get User Details</button>
      <hr />
      <button onClick={Logout}
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >Logout</button>
    </div>
  )
}
