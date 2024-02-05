import React, { FC } from 'react'
import { AiFillDollarCircle } from "react-icons/ai";
import { FaSignOutAlt } from 'react-icons/fa';

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks';
import { useDispatch } from 'react-redux';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorege } from '../healpers/localstorage.helper';
import { toast } from 'react-toastify';

const Header:FC = () => {

    const isAuth = useAppSelector((state)=> state.user.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = ()=> {
      dispatch(logout())
      removeTokenFromLocalStorege("token")
      toast.success("You logger out")
      navigate("/")
    }
  return (
   <header className='flex items-center 
    bg-slate-800 p-4 shadow-sm backdrop-blur-sm'>
         
         <Link to="/">
           <AiFillDollarCircle size={20}/>
         </Link>
         { isAuth && (
            <nav className='ml-auto mr-10'>
            <ul className='flex items-center gap-5 '>
                      <li>
                    <NavLink to={"/"} 
                    className={({isActive})=> isActive ? "text-white": "text-white/50" }>
                        Home
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to={"/categories"}  
                    className={({isActive})=> isActive ? "text-white": "text-white/50" }>
                        Categories
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to={"/transactions"} 
                     className={({isActive})=> isActive ? "text-white": "text-white/50" }>
                            Transactions
                    </NavLink>
                   </li>
            </ul>
            </nav>
         )}

         {
             isAuth ? (
                <button onClick={logoutHandler} className='btn btn-red'>
                     <span>Log out</span>
                     <FaSignOutAlt/>
                     </button>
             ) : <Link className='py-2 text-white/50 hover:text-white ml-auto' to={"auth"}>
                Log In
             </Link>
         }

   </header>
  )
}

export default Header