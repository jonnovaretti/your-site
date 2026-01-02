import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import { TemplatesController } from './controllers/templates.controller';
import { TemplatesService } from './services/templates.service';
import { Thumbnail } from './entities/thumbnail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template, Thumbnail])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class SitesModule {}
