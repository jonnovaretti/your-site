export const STATUS = {
  CREATING: 'Creating',
  CREATED: 'Created',
  STANDBY: 'Standby',
  PUBLISHED: 'Published',
};

export type Status = keyof typeof STATUS;
