import { PaginatedResponse } from '@apps/shared/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from '@sites/entities/template.entity';
import { Repository } from 'typeorm';

export class TemplatesService {
  constructor(
    @InjectRepository(Template) private repository: Repository<Template>,
  ) {}

  async listPaginated(
    page: number = 1,
    limit: number = 20,
  ): Promise<PaginatedResponse<Template>> {
    const skip = (page - 1) * limit;

    const [templates, total] = await this.repository.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
      relations: { thumbnails: true },
    });

    return {
      items: templates,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}
