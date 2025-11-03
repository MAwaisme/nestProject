import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

debugger
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    console.log('JWT_SECRET:', config.get<string>('JWT_SECRET'));
    super({

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret',
      // ignoreExpiration: false,
    });
    console.log("outttt");
  }

  async validate(payload: { sub: number, email: string }) {
    console.log('payload in validate', payload);

    const user = await this.prisma.user.findUnique({
      where:{
        id: payload.sub,
      }
    })
    return user;
  }
}