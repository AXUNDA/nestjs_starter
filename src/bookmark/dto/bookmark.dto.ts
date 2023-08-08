import {IsString,IsEmail,IsNotEmpty,IsNumber,IsOptional} from "class-validator"

export class bookmarkDto {
     
     @IsString()
      @IsNotEmpty()
      title: string;

      @IsString()
   
      @IsOptional()      
      desc: string;

      @IsString()
      @IsNotEmpty()      
      link: string;


}