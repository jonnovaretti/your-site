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

    return this.templatesService.listPaginated(pageNumber, limitNumber);
  }
}
