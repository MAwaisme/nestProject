import { Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController { 
    constructor(private authServices: AuthService){}

    @Post('signup')
    signup(@Req() req: Request){
        console.log("req.body testing......>>>>>>>>>======", req.body);
        
        return this.authServices.signup();
    }

    @Post('signin')
    signin(){
        return this.authServices.signin();
    }
}