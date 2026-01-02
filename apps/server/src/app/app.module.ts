import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectDB } from '../utils/config';
import { UsersModule } from 'src/users/users.module';
import { CommandModule } from 'nestjs-command';
import { SitesModule } from '@sites/sites.module';

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
    SitesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
