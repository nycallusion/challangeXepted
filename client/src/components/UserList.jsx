import React from 'react'

export default function UserList(props) {
  return (
    <div className='p-4'>
        {props.users.map((user, i) => 
        <div key={i}>
            <h1>
                {user.slice(0,15)}
            </h1>
        </div>
        )}
    </div>
  )
}
