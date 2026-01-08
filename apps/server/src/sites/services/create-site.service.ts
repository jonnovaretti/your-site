import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@users/services/users.service';
import { BusinessRequirementError } from '@utils/business-requirement.error';
import { Site } from '@sites/entities/site.entity';
import { Repository } from 'typeorm';

export class CreateSiteService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
    private readonly userService: UsersService,
  ) {}

  async create(site: Partial<Site>, userId: string): Promise<number> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BusinessRequirementError('User not found');
    }

    site.createdBy = user;
    site.status = 'CREATING';

    const inserted = await this.siteRepository.save(site);

    return inserted.id;
  }
}
