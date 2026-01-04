import { SECTION_OPTIONS } from '@apps/shared/types';
import { SectionType } from '@websites/types/section.type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'enum', enum: Object.keys(SECTION_OPTIONS) })
  code: SectionType;
}
