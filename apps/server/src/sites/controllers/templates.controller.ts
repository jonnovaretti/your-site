import { TemplatesPaginatedResponse } from '@apps/shared/types';
import { Controller, Get, Query } from '@nestjs/common';
import { TemplatesService } from '@sites/services/templates.service';

@Controller()
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async listTemplates(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ): Promise<TemplatesPaginatedResponse> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const templatesFound = await this.templatesService.listPaginated(
      pageNumber,
      limitNumber,
    );

    return {
      page: templatesFound.page,
      pages: templatesFound.pages,
      total: templatesFound.total,
      items: templatesFound.items.map(t => {
        return {
          id: t.id,
          name: t.name,
          description: t.description,
          thumbnailsUrls: t.thumbnails.map(n => n.url),
          category: t.category,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
        };
      }),
    };
  }
}
