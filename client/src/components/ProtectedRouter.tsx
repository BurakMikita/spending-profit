import React, { FC } from 'react'
import { useAppSelector } from '../store/hooks'

interface Props {
    children: JSX.Element
}

const ProtectedRouter: FC<Props> = ({children}) => {
    const isAuth = useAppSelector((state)=> state.user.isAuth)
  return (
    <>
    {isAuth ? children : (<div className='flex flex-col justify-center items-center mt-20 gap-10'>

        <h1 className='text-2xl'> To view this page you must be logger in.</h1>
    </div>)}
    </>
  )
}

export default ProtectedRouter