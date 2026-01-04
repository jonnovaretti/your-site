import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@Controller()
export class WebsitesController {
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: WebsiteRequest): Promise<string> {}
}
