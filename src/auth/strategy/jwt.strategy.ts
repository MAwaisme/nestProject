import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    console.log('JWT_SECRET:', config.get<string>('JWT_SECRET'));
    super({
        
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get<string>('JWT_SECRET') || 'super-secret',
        ignoreExpiration: false,
    });
    console.log("outttt");
  }

  validate(payload: any) {
    console.log('payload in validate', payload);
    return "payload";
  }
}