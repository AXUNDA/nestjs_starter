import { Controller, Get, UseGuards,HttpCode,HttpStatus, Patch,Body } from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
      constructor( private readonly userService:UserService){}
      @HttpCode(HttpStatus.OK)
      @Get("me")
      async getMe(@GetUser() user :User) {
            return user
            
      }
      @HttpCode(HttpStatus.OK)
      @Patch("me")
      async editMe(
            @GetUser("id") userId :number,
            @Body() dto:EditUserDto
      ){
            return this.userService.editUser(userId,dto)
            
      }

      

}
