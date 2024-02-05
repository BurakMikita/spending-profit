import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schema/transaction.schema';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports:[ 
    MongooseModule.forFeature([{
    name: Transaction.name,
    schema: TransactionSchema
  }, 
  {
    name: Category.name,
    schema: CategorySchema
  },
  {
    name: User.name,
    schema: UserSchema
  },
  ])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule {}
