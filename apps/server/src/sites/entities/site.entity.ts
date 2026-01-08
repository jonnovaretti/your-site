import { SITE_TYPE_OPTIONS } from '@apps/shared/types';
import { User } from '@users/entities/user.entity';
import { Status, STATUS } from '@sites/types/status.type';
import { SiteType } from '@sites/types/site-type.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Template } from './template.entity';

@Entity()
export class Site {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne<Template>(() => Template, { nullable: true })
  template?: Template;

  @Column({ type: 'enum', enum: Object.keys(SITE_TYPE_OPTIONS) })
  type: SiteType;

  @Column({ type: 'enum', enum: Object.keys(STATUS) })
  status: Status;

  @ManyToOne<User>(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
