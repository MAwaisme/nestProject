import { Module } from "@nestjs/common";
import { UserService } from "./user.servics";

@Module({
    providers: [UserService]
})

export class UserModule { }