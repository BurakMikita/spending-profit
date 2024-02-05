import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {
    
    @IsEmail()
    email: string

    @MinLength(6 ,{message: "Password must ne more tnen 6 symbols"})
    password: string
}
