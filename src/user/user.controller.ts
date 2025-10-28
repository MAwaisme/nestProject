import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'))

    @Get('me')
    getMe(@Req() req: any) {
        console.log("asdasda", req.user);
        return req.user;
    }
}