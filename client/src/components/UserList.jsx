import React from 'react'

export default function UserList(props) {
  return (
    <div className='p-2 border'>
      <h1 className='text-lg text-center bg-blue-300 font-bold'>Users In Room</h1>
      <div className='mt-2'>
      {props.users.map((user, i) => 
        <div key={i} className='bg-slate-300'>
            <h1 className='text-center'>
                {user.slice(0,15)}
            </h1>
        </div>
        )}
      </div>
    </div>
  )
}
