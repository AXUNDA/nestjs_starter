import { Controller,Post,Body,HttpCode,HttpStatus } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto"


@Controller("auth")


export class AuthController{
      constructor(private readonly AuthService: AuthService) { }
            @Post('signup')
            signup(@Body() dto: AuthDto) {
                  console.log(dto)
                  return this.AuthService.signUp(dto)
      }
      @HttpCode(HttpStatus.OK)
      @Post('login')
      login(@Body() dto: AuthDto) {
            return this.AuthService.login(dto)
            }
}