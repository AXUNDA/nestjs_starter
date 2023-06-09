import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import {Injectable} from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service";


@Injectable({})

export class JwtStrategy extends PassportStrategy(Strategy) {
      constructor( private readonly config:ConfigService,private readonly prisma:PrismaService) {
            super({
                   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
            })
      }
    async   validate(payload: {sub:number,email:string}) {
          console.log(payload)
          const user = await this.prisma.user.findUnique({
                  where: {
                        id:payload.sub
                  }
          })
          delete user.hash 
          return user
            
            
      }
}