"use client"
import { signIn } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import Head from "next/head";
import Image from 'next/image';
import "./lo.css"
// import Lo from "../../../../public/2-Photoroom.png-Photoroom.png"
export default function Page() {
  const userName = useRef("");
  const pass = useRef("");
  const [error, setError] = useState(""); // State to manage error messages

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false, // Set redirect to false to handle the response manually
  
    });

    if (result?.error) {
      setError("Invalid username or password"); // Set error message
      console.log(error)
    }else{
      console.log(result)
      setError(""); // Clear error message on successful login
      window.location.href = "/"; // Redirect to callbackUrl manually

    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Create Next App</title>
        {/* Add your meta tags, links, etc. here */}
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div style={{display: "flex", alignItems: "center", flexWrap: "wrap"}} className="bg-white rounded-2xl shadow-2xl w-full sm:w-2/3 max-w-4xl h-full">
          <div className="w-full sm:w-1/2 p-5">
            <div className="text-left font-bold">

<span>
{/* <Image
src={Lo}
width={120}
/> */}
</span>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-pink-500 mb-2">Sign in to Account</h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <p>Use your username account</p>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 mr-2" />
                  <input onChange={(e) => { userName.current = e.target.value }} type="text" name="username" placeholder="username" className="bg-gray-100 outline-none text-sm flex-1" />
                </div>
                <div className="bg-gray-100 w-full sm:w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 mr-2" />
                  <input onChange={(e) => { pass.current = e.target.value }} type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                </div>
                {error && <p className="text-red-500 mb-3">{error}</p>} {/* Display error message */}
                <button onClick={onSubmit} className="border-2 border-pink-500 text-pink-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-pink-500 hover:text-white">Login</button>
              </div>
            </div>
          </div>
          <div style={{height: "31.38rem"}} className="w-full sm:w-1/2 bg-pink-500 text-white rounded-tr-2xl rounded-br-2xl py-8 px-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Welcome!!!</h2>
            <div className="w-16 h-1 bg-green-500 mx-auto mb-6"></div>
            <p>To access your account and track your requests, please enter the username you used to make your request.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
