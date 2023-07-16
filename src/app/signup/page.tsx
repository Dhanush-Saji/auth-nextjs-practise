"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { toast } from "react-hot-toast"

const Signup = () => {
  const router = useRouter()
  const [buttonDisabled, setbuttonDisabled] = useState(true)
  const [loading, setloading] = useState(false)
  const [user, setuser] = useState({
    email:'',
    password:'',
    username:''
  })
  const onSignup = async() =>{
    try {
      setloading(true)
      const response = await axios.post('/api/users/signup',user)
      console.log(response)
      router.push('/login')
    } catch (error) {
      if(error instanceof Error)
      toast.error(error.message)
    }finally{
      setloading(false)
    }
  }
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setbuttonDisabled(false)
    }else{
      setbuttonDisabled(true)
    }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-4xl font-bold mb-4">{loading?"Processing":"Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input className="p-2 rounded-md mb-4 text-black" placeholder="username" type="text"  onChange={(e)=>{setuser({...user,username:e.target.value})}} />
      <label htmlFor="email">Email</label>
      <input className="p-2 rounded-md mb-4 text-black" placeholder="email" type="email" value={user.email} onChange={(e)=>{setuser({...user,email:e.target.value})}} />
      <label htmlFor="password">Password</label>
      <input className="p-2 rounded-md mb-4 text-black" placeholder="password" type="password" value={user.password} onChange={(e)=>{setuser({...user,password:e.target.value})}} />
    <button disabled={buttonDisabled} className={`${buttonDisabled?'bg-slate-600':'bg-blue-600'} px-4 py-2 rounded-md hover:bg-blue-800`} onClick={onSignup}>Signup here!</button>
    <Link className="mt-2 underline underline-offset-4" href='/login'>login here</Link>
    </div>
  )
}

export default Signup