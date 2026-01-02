import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Template } from '../../sites/entities/template.entity';
import { CATEGORY, Category } from '../../sites/types/category.type';

export default class TemplateSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Template);
    const name = 'Starter Portfolio';

    const existingTemplate = await repository.findOne({ where: { name } });
    if (existingTemplate) {
      return;
    }

    const template = repository.create({
      name,
      description: 'A clean portfolio layout for showcasing projects and skills.',
      category: CATEGORY.TECHNOLOGY as unknown as Category,
    });

    await repository.save(template);
  }
}
