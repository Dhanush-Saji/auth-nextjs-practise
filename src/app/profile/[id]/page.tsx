import React from 'react'
type paramType= {
params:{
    id:string
}
}
const UserProfile = ({params}:paramType) => {
    console.log(params);
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-4'>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>Profile page <span className='p-2 rounded bg-blue-500 text-black'>{params.id}</span> </p>
    </div>
  )
}

export default UserProfile