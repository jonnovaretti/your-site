import { IsString } from 'class-validator';

export class SiteCreateRequest {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  type: string;
}
