import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
constructor(
  @InjectModel(User.name) private readonly userRepository: Model<User>,
  private readonly jwtService: JwtService
){}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({ email: createUserDto.email}).exec()
    if(existUser) throw new BadRequestException("this email already exist!")

    const user = await this.userRepository.create({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password)
    })
    const token = this.jwtService.sign({
      email: createUserDto.email,
      
  
    })

    return {user, token};
  }

 
  async findOne(email: string) {
    
    return await this.userRepository.findOne({ email: email }).exec();

  }
  async allUsers (id){
    
    const users =  await this.userRepository.findById(id).populate(["category", "transaction"])
    console.log(users)
    return users
  }
 

}
