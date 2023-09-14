import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow('MONGO_DB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TaskModule,
    StatusModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
