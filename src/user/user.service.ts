import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service"
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {
        
            
            
    }
    async editUser(id:number,dto:EditUserDto){
        const user = await this.prisma.user.update({
            where:{
                id
            },
            data:{
                ...dto
            }
        })

        delete user.hash
        return user
            
    }

}
