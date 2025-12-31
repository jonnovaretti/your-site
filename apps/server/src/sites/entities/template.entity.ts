import { Category } from '../types/category.type';
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  imagesPaths: string[];

  @OneToMany(() => Thumbnail, t => t.template)
  thumbnails: Thumbnail[];

  @Column({ type: 'enum' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
