import React from 'react'

const UserProfile = ({ params }: any) => {
  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen oy-2'>
      <h1>Profile</h1>
      <p>Profile Page {params.id}</p>
    </div>
  )
}

export default UserProfile