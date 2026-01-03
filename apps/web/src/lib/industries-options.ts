export const industries = [
  { code: 'VETERINARY', name: 'Veterinary' },
  { code: 'FINANCE', name: 'Finance' },
  { code: 'SELF_EMPLOYED', name: 'Self-Employed' },
  { code: 'ENGINEERING', name: 'Engineering' },
  { code: 'TECHNOLOGY', name: 'Technology' },
  { code: 'HEALTHCARE', name: 'Healthcare' },
  { code: 'EDUCATION', name: 'Education' },
  { code: 'REAL_ESTATE', name: 'Real Estate' },
  { code: 'LEGAL', name: 'Legal' },
  { code: 'ECOMMERCE', name: 'E-commerce' },
] as const;

export const getIndustries = () => industries;
