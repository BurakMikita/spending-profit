import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2  from 'argon2';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, 
    private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    
    const user = await this.usersService.findOne(email);
    
     if(!user) throw new UnauthorizedException("User or email are incorrect")
    const passwordIsMatch = await argon2.verify(user.password, password)
    if (user && passwordIsMatch) {
      return user
    }
    throw  new UnauthorizedException("User or password are incorrect")
  }

  async login(user) {
    const {_id , email} = user
    return {
      _id, email, token: this.jwtService.sign({
        _id: user._id,
        email: user.email
      })
    }}
}
