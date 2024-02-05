import React, { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IRspondeTrasactiomLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm:FC = () => {
    const {categoties} = useLoaderData() as IRspondeTrasactiomLoader
    const [visibleModal, setVisibleModal] = useState<boolean>(false)


  return (
    <div className=' rounded-md bg-slate-800 p-4'>
        <Form className='grid gap-2' method='post' action='/transactions'>
             <label className='grid' htmlFor='title'>
                <span>Title</span>
                <input className='input' type='text' placeholder='Title...' name='title' required/>
             </label>
             <label  className='grid' htmlFor='amount'>
                <span>Amount</span>
                <input className='input' type='number' placeholder='Amount...' name='amount' required/>
             </label>

             {categoties.length ?  <label htmlFor='category' className='grid'>
                <span>Category</span>
                <select  className='input border-slate-700' name='category' required>
                      {categoties.map((e,i)=> <option value={e._id} key={i}>{e.title}</option>)}
               </select>
             </label>: <h1 className='mt-1 text-red-300'>To continue create a category first</h1>}

           
             
             <button onClick={()=> setVisibleModal(true)} className='mt-2 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'>
           <FaPlus/>
        <span>Manage Categories</span>
      </button>
      <div className='flex gap-4 items-center'>
        <label className='flex cursor-pointer items-center gap-2'>
            <input type='radio' name='type' required value={"income"} className='form-radio text-blue-600'/>
            <span>Income</span>
        </label>
        <label className='flex cursor-pointer items-center gap-2'>
            <input type='radio' name='type' required value={"expense"} className='form-radio text-blue-600'/>
            <span>Expense</span>
        </label>
      </div>
       <button disabled={categoties.length ? false : true} className='btn btn-green max-w-fit mt-2'>
        Submit
       </button>
        </Form>

        {visibleModal && <CategoryModal type='POST'  setVisibleModal={setVisibleModal}/>}
    </div>
  )
}

export default TransactionForm