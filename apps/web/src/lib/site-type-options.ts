import { SITE_TYPE_OPTIONS } from '@apps/shared/types';
import { SelectItemType } from '@components/ui/types/select-item.type';

export function getSiteType(): SelectItemType[] {
  return Object.entries(SITE_TYPE_OPTIONS).map(([key, value]) => {
    return { value: key, text: String(value) };
  });
}
