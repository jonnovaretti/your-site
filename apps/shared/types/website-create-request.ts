import { IsString } from 'class-validator';

export class WebsiteCreateRequest {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  type: string;
}
