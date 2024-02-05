

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {Document,now} from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { Transaction } from 'src/transaction/schema/transaction.schema';


export type UserDocument = User & Document;

@Schema( { timestamps: true })
export class User {

  

    @Prop({unique: true})
    email: string;

    @Prop()
    password: string;


    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]})
    category: Category[];
   
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]})
    transaction: Transaction[];
}

export const UserSchema = SchemaFactory.createForClass(User);