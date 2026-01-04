import { INDUSTRY_OPTIONS } from '@apps/shared/types';

export const getIndustries = () => {
  return Object.entries(INDUSTRY_OPTIONS).map(([key, value]) => {
    return { code: key, name: value };
  });
};
