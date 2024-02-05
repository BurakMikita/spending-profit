import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage:FC = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center 
    gap-10 bg-slate-900 font-roboto text-white'>
    <div >ErrorPage</div>
    <Link to={"/"} className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-700'>
       Back
       </Link>
    </div>
  )
}

export default ErrorPage