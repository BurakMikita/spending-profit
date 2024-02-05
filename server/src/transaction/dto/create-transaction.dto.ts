import { IsNotEmpty, MinLength, isNumber, isString } from "class-validator"
import { ObjectId } from "mongodb"
import { Category } from "src/category/schema/category.schema"
import { User } from "src/user/schema/user.schema"

export class CreateTransactionDto {

   
    @MinLength(4)
    type: "expense" | "income"

    @IsNotEmpty()
    title: string

    
    @IsNotEmpty()
    amount: number

    
    @IsNotEmpty()
    category: ObjectId
    

   
    user?: ObjectId
}
