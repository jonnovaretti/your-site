import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/sites/entities/**/*{.ts,.js}'],

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
