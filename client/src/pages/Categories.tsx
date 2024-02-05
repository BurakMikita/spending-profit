import React, { FC, useState } from 'react'
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import CategoryModal from '../components/CategoryModal'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'

export const categoriesAction = async ({request}: any)=> {
   switch(request.method){
      case "POST": {
        const  formData = await request.formData()
        const title = {
          title: formData.get("title")
        }
        await instance.post("/categories",title)
        return null
      }
      case "PATCH": {
        const  formData = await request.formData()
        const categoty = {
          id: formData.get("id"),
          title: formData.get("title")
        }
        await instance.patch(`/categories/category/${categoty.id}`, categoty)
        return null
      }
      case "DELETE": {
        const  formData = await request.formData()
        const categotyId =  formData.get("id")
        await instance.delete(`/categories/category/${categotyId}`)
        return null
      }
   }
}


export const categoryLoader = async ()=> {
  const {data} = await instance.get<ICategory[]>("/categories")
 
  return data
}



const Categories: FC = () => {
     
    const categories = useLoaderData() as ICategory[]
 const [categoryId, setCategoryId] = useState<string>("0")
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  return (
    <>
    <div className='mt-10 rounded-md bg-slate-800 p-4'>
      <h1>Your category list:</h1>
      <div className='mt-2 flex flex-wrap items-center gap-2'>
         {categories.map((e, inx)=> (
            <div key={inx} className='group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2'>
            {e.title}
              <div className='  group-hover:flex absolute hidden px-3 left-0  top-0 bottom-0 right-0  rounded-lg bg-black/90 items-center justify-between'>
                      <button onClick={()=> { 
                        setIsEdit(true) 
                        setCategoryId(e._id)} }>
                        <AiFillEdit/>
                      </button>
                      <Form className='flex' method='delete' action='/categories'>
                        <input type='hidden' name='id' value={e._id}/>
                        <button type='submit'>
                          <AiFillCloseCircle/>
                        </button>
                      </Form>
              </div>
           </div>
         ))}
      </div>
      <button onClick={()=> setVisibleModal(true)} className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'>
           <FaPlus/>
        <span>Create a new category</span>
      </button>
    </div>
    {visibleModal && <CategoryModal type='POST'  setVisibleModal={setVisibleModal}/>}

    {isEdit &&  <CategoryModal type='PATCH' id={categoryId}  setVisibleModal={setIsEdit}/>}
    
    </>
  )
}

export default Categories