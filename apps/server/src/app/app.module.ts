import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesModule } from '@sites/sites.module';
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
    SitesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
