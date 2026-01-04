import { WEBSITE_TYPE_OPTIONS } from '@apps/shared/types';
import { SelectItemType } from '@components/ui/types/select-item.type';

export function getWebsiteType(): SelectItemType[] {
  return Object.entries(WEBSITE_TYPE_OPTIONS).map(([key, value]) => {
    return { value: key, text: String(value) };
  });
}
