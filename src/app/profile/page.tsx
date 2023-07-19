"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Profile = () => {
  const router = useRouter()
  const logOut = async() =>{
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-4'>
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <hr />
        <button onClick={logOut} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
          Log Out
        </button>
    </div>
  )
}

export default Profile