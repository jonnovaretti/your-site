'use server';

export async function fetchPublic(url: string, config: RequestInit = {}) {
  const { headers, ...rest } = config;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...rest,
    headers: {
      ...headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response;
}
