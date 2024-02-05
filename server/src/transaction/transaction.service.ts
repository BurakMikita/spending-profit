import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schema/transaction.schema';
import { Model } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private readonly transactionRepository: Model<Transaction>,
    @InjectModel(Category.name) private readonly  categoryRespository: Model<Category>,
    @InjectModel(User.name) private readonly  ueserRespository: Model<User>
  ){
    
  }

  async create(createTransactionDto: CreateTransactionDto, id: string) {

    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: id,
      category: createTransactionDto.category
    }

    if(!newTransaction) throw new BadRequestException("Something went wrong")
    const transaction: any =  await this.transactionRepository.create(newTransaction);

    const user = await this.ueserRespository.findById(id)
    user.transaction.push(transaction._id)
    user.save()
    
    const category = await this.categoryRespository.findById(createTransactionDto.category)
    category.transaction.push(transaction._id)
    category.save()

    return transaction
  }

  async findAllByType(id: string, type: string){
      const transaction = await this.transactionRepository.find({
        user: id,
        type
      })

      const total = transaction.reduce((acc, obj)=> acc + obj.amount  , 0)

      return total
  }

 async findAll(id: string) {
    const transaction = await this.transactionRepository.find({
      user: id
    }).sort([['createdAt', -1]]).populate([  "category"])
    return transaction
  }

 async findOne(id: string) {
      const transaction = await this.transactionRepository.findById(id).populate([ "user", "category"]);
      if(!transaction)  throw new NotFoundException("transaction non found")
    return transaction  
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    
    const transaction = await this.transactionRepository.updateOne({_id: id}, updateTransactionDto)

    return  transaction
  }

  async remove(id: string) {
    const response =  await this.transactionRepository.findByIdAndDelete(id);
    if(!response) throw new NotFoundException("this non exist") 
    return response
  }
}
