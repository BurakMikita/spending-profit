import { IsNotEmpty, IsOptional } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateCategoryDto {
    @IsNotEmpty()
    title: string
    @IsOptional()
    user?: ObjectId

}
