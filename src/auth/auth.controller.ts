import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController { 
    constructor(private authServices: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log("req.body testing......>>>>>>>>>======", dto);
        
        return this.authServices.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authServices.signin(dto);
    }
}