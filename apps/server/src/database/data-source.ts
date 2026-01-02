import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Template } from '../sites/entities/template.entity';
import { Thumbnail } from '../sites/entities/thumbnail.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Template, Thumbnail],

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
