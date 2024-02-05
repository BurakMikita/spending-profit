import React, { FC, useState } from "react"
import { AuthService } from "../services/auth.service"
import { toast } from "react-toastify"
import { setTokenToLocaStorege } from "../healpers/localstorage.helper"
import { useAppDispatch } from "../store/hooks"
import { login } from "../store/user/userSlice"
import { useNavigate } from "react-router-dom"


const Auth: FC = () => {
  const [email , setEmail] = useState<string>("")
  const [password , setPassword] = useState<string>("")
 const  [isLogin, setIsLogin]= useState<boolean>(false)
 const dispatch = useAppDispatch()
 const navigate = useNavigate()


  const RegistrationHandler = async (e: React.FormEvent<HTMLFormElement>)=> {
    try {
      e.preventDefault()
      const data = await AuthService.registratiom({email, password})
      console.log(data)
      if(data){
        toast.success("Account has been created!")
        setIsLogin(!isLogin)
      }
    }catch(e:any){
      
        const error = e.response?.data.message 
        toast.error(error.toString())
    }
  }

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>)=> {
    try {
      e.preventDefault()
      const data = await AuthService.login({email, password})
      if(data){
        setTokenToLocaStorege("token",data.token)
        dispatch(login(data))
        toast.success("You logger id")
        navigate("/")
      }
      
    }catch(e:any){
      
        const error = e.response?.data.message 
        toast.error(error.toString())
    }
  }
 
  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login": "Registration"}
      </h1>
      <form onSubmit={ isLogin ? loginHandler :  RegistrationHandler} className="flex w-1/3 flex-col mx-auto gap-5">
           <input onChange={(e)=> setEmail(e.target.value)}  type="text" className="input" placeholder="Email"/>
           <input onChange={(e)=> setPassword(e.target.value)}   type="password" className="input" placeholder="Password"/>

           <button className="btn btn-green mx-auto">
                 Submit
           </button>

        
      </form>
      <div className="flex justify-center mt-5">
            {isLogin ? (
              <button onClick={()=> setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
                You don t have an account?
              </button>
            ) :(
              <button  onClick={()=> setIsLogin(!isLogin)} className="text-slate-300 hover:text-white">
              Already have an account?
            </button>
            )}
           </div>
    </div>
  )
}

export default Auth