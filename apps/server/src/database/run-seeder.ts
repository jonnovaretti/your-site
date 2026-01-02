import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

(async () => {
  const options: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['src/sites/entities/**/*{.ts,.js}'],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
  });
})();
