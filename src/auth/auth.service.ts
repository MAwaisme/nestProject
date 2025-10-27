import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        console.log("getting DTO in auth servicee", dto);

        try {
            // Genrate the password Hash :::>>>>>>>>>>>
            const hash = await argon.hash(dto.password);
            // Save the new user in DB
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })
            // Return the saved user.
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        // If user dose not exsit then throw expception
        if (!user)
            throw new ForbiddenException("Credentials incorrect!")
        // Compare password
        const pwMatches = await argon.verify(
            user?.hash,
            dto.password
        )

        if (!pwMatches)
            throw new ForbiddenException("Incorrect password!")
        // If password dose not match then throw expection

        // delete user.hash
        return user;
    }
}