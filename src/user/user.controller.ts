import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UsersController {
    @UseGuards(JwtGuard)
    @Get('me')

    getProfile(@Req() req: Request) {
        return req.user; // typed correctly now
    }
}