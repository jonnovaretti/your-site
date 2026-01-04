import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsitesModule } from '@websites/websites.module';
import { CommandModule } from 'nestjs-command';
import { UsersModule } from 'src/users/users.module';
import { connectDB } from '../utils/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    CommandModule,
    UsersModule,
    WebsitesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
