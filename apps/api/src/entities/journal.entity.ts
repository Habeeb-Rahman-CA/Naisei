import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { JournalPage } from './journal-page.entity';

@Entity('journals')
export class Journal {
  @PrimaryColumn('uuid')
  id!: string; // Client-generated UUIDv7

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.journals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'cover_color', length: 32, nullable: true })
  coverColor?: string;

  @Column({
    name: 'default_paper_type',
    type: 'varchar',
    length: 20,
    default: 'lined',
  })
  defaultPaperType!: 'lined' | 'blank' | 'dotted';

  @Column({ name: 'client_created_at', type: 'timestamptz' })
  clientCreatedAt!: Date;

  @Column({ name: 'client_updated_at', type: 'timestamptz' })
  clientUpdatedAt!: Date;

  @UpdateDateColumn({ name: 'server_updated_at', type: 'timestamptz' })
  serverUpdatedAt!: Date;

  @Column({ type: 'integer', default: 1 })
  revision!: number;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted!: boolean;

  @OneToMany(() => JournalPage, (page) => page.journal)
  pages?: JournalPage[];
}
