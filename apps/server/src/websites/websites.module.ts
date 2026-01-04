import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import { TemplatesController } from './controllers/templates.controller';
import { TemplatesService } from './services/templates.service';
import { Thumbnail } from './entities/thumbnail.entity';
import { Industry } from './entities/industry.entity';
import { Section } from './entities/section.entity';
import { Website } from './entities/website.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template, Thumbnail, Industry, Website, Section]),
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class WebsitesModule {}
