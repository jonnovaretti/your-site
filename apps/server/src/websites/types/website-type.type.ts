import { WEBSITE_TYPE_OPTIONS } from '@apps/shared/types';

export type WebsiteType = keyof typeof WEBSITE_TYPE_OPTIONS;

export const isWebsiteType = (value: string): value is WebsiteType => {
  return Object.keys(WEBSITE_TYPE_OPTIONS).includes(value as WebsiteType);
};
