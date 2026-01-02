import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { Template } from '../sites/entities/template.entity';
import { Thumbnail } from '../sites/entities/thumbnail.entity';

(async () => {
  const options: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Template, Thumbnail],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  runSeeders(dataSource, {
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
  });
})();
