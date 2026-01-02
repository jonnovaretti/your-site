import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

(async () => {
  const options: DataSourceOptions = {
    type: 'postgres',
    database: 'your_site_db',
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  runSeeders(dataSource, {
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
  });
})();
