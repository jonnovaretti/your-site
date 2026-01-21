import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { TemplatesController } from './controllers/templates.controller';
import { SitesController } from './controllers/sites.controller';
import { Industry } from './entities/industry.entity';
import { Section } from './entities/section.entity';
import { Template } from './entities/template.entity';
import { Thumbnail } from './entities/thumbnail.entity';
import { Site } from './entities/site.entity';
import { CreateSiteService } from './services/create-site.service';
import { TemplatesService } from './services/templates.service';
import { SelectTemplateService } from './services/select-template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template, Thumbnail, Industry, Site, Section]),
    UsersModule,
  ],
  controllers: [TemplatesController, SitesController],
  providers: [TemplatesService, CreateSiteService, SelectTemplateService],
})
export class SitesModule {}
