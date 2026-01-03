import { CATEGORY, Category } from '../types/category.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Thumbnail } from './thumbnail.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Thumbnail, t => t.template)
  thumbnails: Thumbnail[];

  @Column({ type: 'enum', enum: Object.keys(CATEGORY) })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
