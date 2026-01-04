import { INDUSTRY_OPTIONS, WEBSITE_TYPE_OPTIONS } from '@apps/shared/types';
import { WebSiteType } from '@websites/types/type-site.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Industry } from './industry.entity';
import { Template } from './template.entity';
import { Status, STATUS } from '@websites/types/status.type';

@Entity()
export class Website {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne<Template>(() => Template, { nullable: true })
  template: Template;

  @Column({ type: 'enum', enum: Object.keys(INDUSTRY_OPTIONS) })
  industry: Industry;

  @Column({ type: 'enum', enum: Object.keys(WEBSITE_TYPE_OPTIONS) })
  type: WebSiteType;

  @Column({ type: 'enum', enum: Object.keys(STATUS) })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
