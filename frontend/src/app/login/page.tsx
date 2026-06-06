"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import api
from "../../services/axios";

import {
 useAuthStore
}
from "../../store/authStore";

export default function Login(){

 const router =
 useRouter();

 const setToken =
 useAuthStore(
  state =>
  state.setToken
 );

 const [email,setEmail]
 = useState("");

 const [password,
 setPassword]
 = useState("");

 const submit =
 async()=>{

  const res =
  await api.post(
   "/auth/login",
   {
    email,
    password
   }
  );

  setToken(
   res.data.token
  );

  router.push(
   "/colleges"
  );
 };

 return(
  <div
  className="
  max-w-md
  mx-auto
  mt-20
  "
  >

   <h1
   className="
   text-4xl
   mb-6
   "
   >
    Login
   </h1>

   <input
    placeholder="Email"
    value={email}
    onChange={(e)=>
      setEmail(
       e.target.value
      )
    }
    className="
    border
    p-2
    w-full
    mb-4
    "
   />

   <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e)=>
      setPassword(
       e.target.value
      )
    }
    className="
    border
    p-2
    w-full
    mb-4
    "
   />

   <button
   onClick={submit}
   className="
   bg-black
   text-white
   px-4
   py-2
   "
   >
    Login
   </button>

  </div>
 )
}