import {Injectable} from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service"
import { AuthDto } from "./dto"
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { ForbiddenException } from "@nestjs/common/exceptions"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from '@nestjs/config';


@Injectable({})


export class AuthService {
      constructor(private readonly prisma: PrismaService,private readonly jwt:JwtService,private readonly config:ConfigService) {
            
            
      }
      async login(dto: AuthDto) {
            const user = await this.prisma.user.findUnique({
                  where: {
                        email:dto.email
                  }
            })
            if (!user) throw new ForbiddenException("credentials not found")
            const pwMatches = await argon.verify(user.hash, dto.password)
            if (!pwMatches) throw new ForbiddenException("incorrect credentials")
            //  delete  (await user).hash

           return this.signToken(user.id,user.email)
            
            
               

            
      }

      async signUp(dto: AuthDto) {
            try {
              const hash = await argon.hash(dto.password)
           const user = this.prisma.user.create({
                 data: {
                       email: dto.email,
                       hash
                 }
           })
      //      delete  (await user).hash

           return user
            
            } catch (error) {
                  console.error(error)
                
              
                        if (error.code === "P2002") {
                              throw new ForbiddenException("credentials taken")
                        }
                        
                   else {
                        throw error
                        
                  }
            
      }    
            
      
      }
      async signToken(userId: number, email: string):Promise<object> {
            const data = { sub: userId, email }
            const token = await this.jwt.signAsync(data,{expiresIn:"15m",secret:this.config.get("JWT_SECRET")})
            return {access_token:token}
      }
}



