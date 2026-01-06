import {
  ApiResponse,
  UserAuthenticated,
  WebsiteCreateRequest,
} from '@apps/shared/types';
import { CurrentUser } from '@decorators/current-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateWebsiteService } from '@websites/services/create-website.service';
import { isWebsiteType } from '@websites/types/website-type.type';
import { InvalidArgumentError } from 'ai';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly createWebsiteService: CreateWebsiteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: WebsiteCreateRequest,
    @CurrentUser() user: UserAuthenticated,
  ): Promise<ApiResponse<number>> {
    if (!isWebsiteType(dto.type)) {
      throw new InvalidArgumentError({
        parameter: 'type',
        value: dto.type,
        message: 'Type is invalid',
      });
    }

    const id = await this.createWebsiteService.create(
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
      message: 'Website was created',
    };
  }
}
