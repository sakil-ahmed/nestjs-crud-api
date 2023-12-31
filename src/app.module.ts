import { Module, } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {TaskModule} from './task/task.module';
import {StatusModule} from './status/status.module';
import {CategoriesModule} from './categories/categories.module';
import {AuthModule} from './auth/auth.module';
import {MulterModule} from '@nestjs/platform-express';
import {AppController} from './app.controller';
import {AppService} from './app.service';



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
    MulterModule.register({dest: './uploads'}),
    AuthModule,
    TaskModule,
    StatusModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
