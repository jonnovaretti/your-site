import { SECTION_OPTIONS } from '@apps/shared/types';

export const getSections = () => {
  return Object.entries(SECTION_OPTIONS).map((key, value) => {
    return { code: key, name: value };
  });
};
