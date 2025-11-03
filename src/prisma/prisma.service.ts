import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../../generated/prisma';
import { url } from 'inspector';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        })
        console.log("config>>>>>>>>>>>>>=====", config.get('DATABASE_URL'));
    }
}