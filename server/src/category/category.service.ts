import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';



import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Transaction } from 'src/transaction/schema/transaction.schema';





@Injectable()
export class CategoryService {

  constructor(
    @InjectModel(Transaction.name) private readonly transactionRepository: Model<Transaction>,
    @InjectModel(Category.name) private readonly  categoryRespository: Model<Category>,
    @InjectModel(User.name) private readonly  ueserRespository: Model<User>
  
    ){

  }
  async create(createCategoryDto: CreateCategoryDto, id: ObjectId) {
   

    const user = await this.ueserRespository.findById(id).populate("category")
  
    if(!user)  throw new HttpException("User not Found", 404)

    const index = user.category.find((e)=> e.title === createCategoryDto.title )
    if( index) throw new BadRequestException("this category exist!")

    const category: any = await this.categoryRespository.create({...createCategoryDto,user:id })

    user.category.push(category._id)
    user.save()
  
 
    return  category
  }

  async findAll(id: ObjectId) {
    const categorys = await this.categoryRespository.find({
      user: id
    })
    return categorys
  }

 async findOne(id: ObjectId) {
    const category = await this.categoryRespository.findById(id).populate("user")
    
    if(!category) throw new NotFoundException("Category not found") 
    
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
 
   const response = this.categoryRespository.updateOne({_id: id}, updateCategoryDto)

    return await response
  }

 async remove(id: string) {
    const response =  await this.categoryRespository.findByIdAndDelete(id);
     await  this.transactionRepository.deleteMany({
      category: id
     })
    if(!response) throw new NotFoundException("this non exist") 
    return response
  }
}
