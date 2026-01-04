import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { TemplatesController } from './controllers/templates.controller';
import { WebsitesController } from './controllers/websites.controller';
import { Industry } from './entities/industry.entity';
import { Section } from './entities/section.entity';
import { Template } from './entities/template.entity';
import { Thumbnail } from './entities/thumbnail.entity';
import { Website } from './entities/website.entity';
import { CreateWebsiteService } from './services/create-website.service';
import { TemplatesService } from './services/templates.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template, Thumbnail, Industry, Website, Section]),
    UsersModule,
  ],
  controllers: [TemplatesController, WebsitesController],
  providers: [TemplatesService, CreateWebsiteService],
})
export class WebsitesModule {}
