"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

const Signup = () => {
  const [user, setuser] = useState({
    email:'',
    password:'',
    username:''
  })
  const onSignup = async() =>{

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-0">
      <h1 className="text-4xl font-bold mb-4">Signup</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input className="p-2 rounded-md mb-4" placeholder="username" type="text"  onChange={(e)=>{setuser({...user,username:e.target.value})}} />
      <label htmlFor="email">Email</label>
      <input className="p-2 rounded-md mb-4" placeholder="email" type="email" value={user.email} onChange={(e)=>{setuser({...user,email:e.target.value})}} />
      <label htmlFor="password">Password</label>
      <input className="p-2 rounded-md mb-4" placeholder="password" type="password" value={user.password} onChange={(e)=>{setuser({...user,password:e.target.value})}} />
    <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-800" onClick={onSignup}>Signup here!</button>
    <Link className="mt-2 underline underline-offset-4" href='/login'>login here</Link>
    </div>
  )
}

export default Signup