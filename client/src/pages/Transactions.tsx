import React, { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import { ICategory, IRspondeTrasactiomLoader, ITransaction } from '../types/types'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import { fromatToUSD } from '../healpers/currency.helper'
import Chart from '../components/Chart'

export const transactionLoder = async ()=> {
  const categoties = await instance.get<ICategory[]>("/categories")
  const transactions = await instance.get<ITransaction[]>("/transactions")
  const totalIncome = await instance.get<number>("/transactions/income/find")
  const totalExpense = await instance.get<number>("/transactions/expense/find")
  const data ={
    categoties: categoties.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data
  }
  return data
}
export const transactionAction = async ({request}: any)=> {
  switch(request.method){
    case "POST": {
              const formData = await request.formData()
              const newTransaction = {
                title: formData.get("title"),
                amount: formData.get("amount"),
                category: formData.get("category"),
                type: formData.get("type"),
              }

              await instance.post("/transactions", newTransaction)
              toast.success("Transaction added.")
              return null
    }
    case "DELETE": {
      const formData = await request.formData()
      const transactionId = formData.get("id")
      await instance.delete( `/transactions/transaction/${transactionId}`)
      toast.success("Transaction delet.")
      return null
    }

  }
}


const Transactions:FC = () => {
  const {totalIncome, totalExpense} = useLoaderData() as IRspondeTrasactiomLoader
  return (
    <>
     <div className='grid grid-cols-3 gap-1 mt-4 items-start '>
        <div className='grid col-span-2'><TransactionForm/></div>

        <div className='rounded-md bg-slate-800 p-3'>
           <div className='grid grid-cols-2 gap-3'>
            <div>
              <p className=' uppercase text-md text-center font-bold'>
                Total Icome:
                </p>
                <p className='mt-2 rounded-sm bg-green-600 p-1 text-center'>
                  { fromatToUSD.format(totalIncome)}
                </p>
            </div>
            <div>
              <p className=' uppercase text-md text-center font-bold'>
                Total Exprense:
                </p>
                <p className='mt-2 rounded-sm bg-red-600 p-1 text-center'>
                  { fromatToUSD.format(totalExpense)}
                </p>
            </div>
           </div>

           <><Chart totalIncome={totalIncome} totalExpense={totalExpense}/></>
        </div>
     </div>

    <h1 className='my-5'><TransactionTable/></h1>
    </>
  )
}

export default Transactions