
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, now} from 'mongoose';
import * as mongoose from 'mongoose'
import { Category } from 'src/category/schema/category.schema';
import { User } from 'src/user/schema/user.schema';


export type TransactionDocument = Transaction & Document;

@Schema( { timestamps: true })
export class Transaction {

  

    @Prop()
    title: string
    @Prop({nullable: true})
    type: string
    @Prop()
    amount: number

    

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    category: Category;
  

   

   
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);