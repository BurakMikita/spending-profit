


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, now} from 'mongoose';
import * as mongoose from 'mongoose'
import { Transaction } from 'src/transaction/schema/transaction.schema';
import { User } from 'src/user/schema/user.schema';


export type CategoryDocument = Category & Document;

@Schema( { timestamps: true })
export class Category {

  

    @Prop()
    title: string


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]})
    transaction: Transaction[];

   
  

   

   
}

export const CategorySchema = SchemaFactory.createForClass(Category);