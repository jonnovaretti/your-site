import {
  ApiResponse,
  UserAuthenticated,
  SiteCreateRequest,
} from '@apps/shared/types';
import { CurrentUser } from '@decorators/current-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateSiteService } from '@sites/services/create-site.service';
import { isSiteType } from '@sites/types/site-type.type';
import { InvalidArgumentError } from 'ai';

@Controller('sites')
export class SitesController {
  constructor(private readonly createSiteService: CreateSiteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: SiteCreateRequest,
    @CurrentUser() user: UserAuthenticated,
  ): Promise<ApiResponse<number>> {
    if (!isSiteType(dto.type)) {
      throw new InvalidArgumentError({
        parameter: 'type',
        value: dto.type,
        message: 'Type is invalid',
      });
    }

    const id = await this.createSiteService.create(
      {
        title: dto.title,
        description: dto.description,
        type: dto.type,
      },
      user.id,
    );

    return {
      success: true,
      data: id,
      message: 'Site was created',
    };
  }
}
