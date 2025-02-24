import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `src/config/envs/.env.${process.env.NODE_ENV}`,
            load: [configuration],
            validationSchema,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        DatabaseModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
