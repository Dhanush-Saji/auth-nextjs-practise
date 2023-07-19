"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const Profile = () => {
  const router = useRouter()
  const [data, setdata] = useState("")
  const logOut = async() =>{
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  const getUserDetails = async() =>{
    const res = await axios.get('/api/users/myData')
    console.log(res.data)
    setdata(res.data.data._id)
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-4'>
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className='rounded bg-red-600 cursor-pointer p-2'>{data == ''?'Nothing':<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button onClick={getUserDetails} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'>
          Get user details
        </button>
        <button onClick={logOut} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
          Log Out
        </button>
    </div>
  )
}

export default Profile