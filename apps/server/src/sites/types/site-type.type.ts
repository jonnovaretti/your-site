import { SITE_TYPE_OPTIONS } from '@apps/shared/types';

export type SiteType = keyof typeof SITE_TYPE_OPTIONS;

export const isSiteType = (value: string): value is SiteType => {
  return Object.keys(SITE_TYPE_OPTIONS).includes(value as SiteType);
};
