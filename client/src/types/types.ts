
export interface IUSer {
   _id:string
   email: string
   token: string
}

export interface IUserData  {
   email: string
   password: string
}

export interface IResponseUser {
   email: string | undefined
      category : []
     transaction: []
      password: string | undefined
      createdAt: string| undefined
      updateAt: string | undefined
      __v?: number | undefined
      _id?: string | undefined
      message: string | undefined
}

export interface IReponseUserData {
   token: string
   user: IResponseUser
   
}

export interface ICategory  {
   _id: string 
   title: string
   createdAt: string
   updateAt: string 
   __v?: number 
   transaction: []

}
export interface ITransaction {
  amount: number
  _id: string 
  title: string
  createdAt: string
  updateAt: string 
  __v?: number 
  type: string
  category: ICategory
}

export interface IRspondeTrasactiomLoader {
   transactions: ITransaction[]
   categoties: ICategory[]
   totalIncome: number
    totalExpense: number
}