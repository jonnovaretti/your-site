import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Thumbnail } from './thumbnail.entity';
import { Industry } from './industry.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @OneToMany(() => Thumbnail, t => t.template)
  thumbnails: Thumbnail[];

  @ManyToMany(() => Industry)
  @JoinTable()
  industries: Industry[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
