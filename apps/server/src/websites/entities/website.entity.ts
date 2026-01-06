import { WEBSITE_TYPE_OPTIONS } from '@apps/shared/types';
import { User } from '@users/entities/user.entity';
import { Status, STATUS } from '@websites/types/status.type';
import { WebsiteType } from '@websites/types/website-type.type';
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
export class Website {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne<Template>(() => Template, { nullable: true })
  template?: Template;

  @Column({ type: 'enum', enum: Object.keys(WEBSITE_TYPE_OPTIONS) })
  type: WebsiteType;

  @Column({ type: 'enum', enum: Object.keys(STATUS) })
  status: Status;

  @ManyToOne<User>(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
