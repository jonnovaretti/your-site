import { IsString } from 'class-validator';

export class SelectTemplateRequest {
  @IsString()
  templateId: string;
}
