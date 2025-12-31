import { PaginatedResponse, Template } from '@apps/shared/types';
import { fetchPublic } from '@lib/fetch-public';

export async function getTemplates(
  page: number = 1,
  limit: number = 10,
  keyword?: string,
): Promise<PaginatedResponse<Template>> {
  try {
    console.log('get templates');

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (keyword) {
      searchParams.append('keyword', keyword);
    }

    const response = await fetchPublic(`/templates?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = (await response.json()) as PaginatedResponse<Template>;

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      items: [],
      total: 0,
      page: 1,
      pages: 1,
    };
  }
}
