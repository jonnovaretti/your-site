import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  database: 'your_site_db',

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
