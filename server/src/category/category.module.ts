import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { AppModule } from 'src/app.module';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Transaction, TransactionSchema } from 'src/transaction/schema/transaction.schema';
import { TransactionService } from 'src/transaction/transaction.service';


@Module({
  imports: [
    
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
  ]),
    
  ],
  controllers: [CategoryController],
  providers: [CategoryService, TransactionService],
})
export class CategoryModule {}
