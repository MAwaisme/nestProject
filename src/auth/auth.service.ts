import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

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
            // return user;
            return this.signToken(user.id, user.email)
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
        // return user;

        // Destructure to exclude the hash
        // const { hash, ...userWithoutHash } = user;
        // return userWithoutHash;

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {

        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        console.log("Get secret JWT>>>>>>>===", secret);

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret
        });

        return {
            access_token: token
        }
    }
}