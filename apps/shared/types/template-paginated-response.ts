import { PaginatedResponse } from './api-response';
import { TemplateResponse } from './template.response';

export interface TemplatesPaginatedResponse
  extends PaginatedResponse<TemplateResponse> {}
