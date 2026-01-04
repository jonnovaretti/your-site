import { INDUSTRY_OPTIONS } from '@apps/shared/types';
import { IndustryCode } from '@websites/types/industry.type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Industry {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'enum', enum: Object.keys(INDUSTRY_OPTIONS) })
  code: IndustryCode;
}
