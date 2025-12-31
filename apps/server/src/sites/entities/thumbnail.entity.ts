import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Template } from './template.entity';

@Entity()
export class Thumbnail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Template, template => template.thumbnails)
  template: Template;
}
