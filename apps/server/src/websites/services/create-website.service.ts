import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@users/services/users.service';
import { BusinessRequirementError } from '@utils/business-requirement.error';
import { Website } from '@websites/entities/website.entity';
import { Repository } from 'typeorm';

export class CreateWebsiteService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
    private readonly userService: UsersService,
  ) {}

  async create(website: Partial<Website>, userId: string): Promise<number> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BusinessRequirementError('User not found');
    }

    website.createdBy = user;
    website.status = 'CREATING';

    const inserted = await this.websiteRepository.save(website);

    return inserted.id;
  }
}
