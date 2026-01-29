import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@users/services/users.service';
import { BusinessRequirementError } from '@utils/business-requirement.error';
import { Site } from '@sites/entities/site.entity';
import { Repository } from 'typeorm';
import { Template } from '@sites/entities/template.entity';

export class SelectTemplateService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
    private readonly userService: UsersService,
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async select({
    siteId,
    userId,
    templateId,
  }: {
    siteId: number;
    userId: string;
    templateId: number;
  }): Promise<boolean> {
    const user = await this.userService.findById(userId);
    const sites = await this.siteRepository.find({
      where: { id: siteId },
      relations: { createdBy: true },
    });
    const template = await this.templateRepository.findOneBy({
      id: templateId,
    });
    const site = sites[0];

    if (!user || !site || !template) {
      throw new BusinessRequirementError(
        'User, template or site were not found',
      );
    }

    if (site.createdBy.id !== userId) {
      throw new BusinessRequirementError('Site does not belong to this user');
    }

    site.template = template;

    const inserted = await this.siteRepository.update({ id: siteId }, site);

    return inserted.affected ? inserted.affected > 0 : false;
  }
}
