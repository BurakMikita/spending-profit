import  { FC } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IRspondeTrasactiomLoader } from '../types/types'
import { formatDate } from '../healpers/date.helper'
import { fromatToUSD } from '../healpers/currency.helper'

const TransactionTable: FC = () => {
  const {transactions} = useLoaderData() as IRspondeTrasactiomLoader

  console.log(transactions)
  return (
    <div className=' bg-slate-800 px-4 py-3 mt-4 rounded-md'>
      <table className='w-full'>
        <thead>
           <tr>
              <td className=' font-bold'>№</td>
              <td className=' font-bold'>Title</td>
              <td className=' font-bold'>Amount($)</td>
              <td className=' font-bold'>Category</td>
              <td className=' font-bold'>Date</td>
              <td className=' text-right'>Action</td>
           </tr>
        </thead>
         <tbody>
            {transactions.map((e,ind)=>(
                <tr key={ind}>
                <td>{ind +1}</td>
                <td>{e.title}</td>
                <td className={e.type === "income" ? " text-green-500" : " text-red-500" }>
                  {e.type === "income" ?
                   `+ ${fromatToUSD.format(e.amount)}`:
                    `- ${fromatToUSD.format(e.amount)}`}
                  </td>
                <td>{e.category.title}</td>
                <td>{formatDate(e.createdAt) }</td>
                <td>
                  <Form method='delete' action='/transactions'>
                    <input className='hidden' name='id' value={e._id}/>
                  <button className='btn hover:btn-red ml-auto'>
                  <FaTrash/>
                  </button>
                  </Form>
                </td>
              </tr>
            ))}
         </tbody>


      </table>
    </div>
  )
}

export default TransactionTable