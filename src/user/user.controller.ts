import { Controller, Get, UseGuards,HttpCode,HttpStatus } from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
      @HttpCode(HttpStatus.OK)
      @Get()
      async getMe(@GetUser() user :User) {
            return user
            
      }
      

}
