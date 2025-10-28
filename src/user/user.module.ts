import { Module } from "@nestjs/common";
import { UserService } from "./user.servics";
import { UserController } from './user.controller';

@Module({
    providers: [UserService],
    controllers: [UserController]
})

export class UserModule { }