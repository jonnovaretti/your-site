import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Template } from './template.entity';

@Entity()
export class Thumbnail {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Template, template => template.thumbnails, {
    nullable: false,
  })
  @JoinColumn({ name: 'template_id' })
  template: Template;
}
