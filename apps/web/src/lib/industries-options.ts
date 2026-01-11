import { INDUSTRY_OPTIONS } from '@apps/shared/types';

export const getIndustries = () => {
  return Object.entries(INDUSTRY_OPTIONS).map(([key, value]) => {
    return { code: key, name: value };
  });
};

export const getIndustryText = (value: string): string => {
  if (value in INDUSTRY_OPTIONS) {
    return INDUSTRY_OPTIONS[value];
  }

  return value;
};
