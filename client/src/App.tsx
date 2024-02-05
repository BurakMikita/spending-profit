import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { useDispatch } from "react-redux"
import { getTokenFromLocalStorege } from "./healpers/localstorage.helper"
import { AuthService } from "./services/auth.service"
import { login, logout } from "./store/user/userSlice"
import { useEffect } from "react"




function App() {


   const dispatch = useDispatch()

   const checkAuth = async ()=> {
    const token = getTokenFromLocalStorege()

    try{
      if(token){
        const data = await AuthService.getProfile()
          if(data){
            dispatch(login(data))
          }else {
            dispatch(logout())
          }
      }
    }catch(e){
      console.log(e)
    }
   }

   useEffect(()=> {
    checkAuth()
   })

  return (
    <RouterProvider router={router}/>
  )
}

export default App
