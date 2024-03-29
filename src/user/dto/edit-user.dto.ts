import {IsString,IsEmail,IsOptional} from "class-validator"

export class EditUserDto {
      @IsEmail()
      @IsOptional()
      email?: string;

      @IsString() 
      @IsOptional()
      password?: string;

      
      @IsString() 
      @IsOptional()
      firstName?: string;

      @IsString() 
      @IsOptional()
      lastName?: string;


}