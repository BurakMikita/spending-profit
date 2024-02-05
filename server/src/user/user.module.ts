import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import {  ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }, 
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret:  configService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: "30d"
        }
      }),
      inject:[ConfigService]
    }),
    
  ],
  
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
