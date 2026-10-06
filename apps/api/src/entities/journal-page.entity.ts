import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Journal } from './journal.entity';

@Entity('journal_pages')
@Index(['userId', 'entryDate'])
@Index(['journalId', 'pageNumber'])
export class JournalPage {
  @PrimaryColumn('uuid')
  id!: string; // Client-generated UUIDv7

  @Column({ name: 'journal_id', type: 'uuid' })
  journalId!: string;

  @ManyToOne(() => Journal, (journal) => journal.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'journal_id' })
  journal?: Journal;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ length: 255, default: '' })
  title!: string;

  @Column({ type: 'jsonb' })
  content!: Record<string, unknown>;

  @Column({
    name: 'paper_type',
    type: 'varchar',
    length: 20,
    default: 'lined',
  })
  paperType!: 'lined' | 'blank' | 'dotted';

  @Column({ name: 'page_number', type: 'integer', default: 1 })
  pageNumber!: number;

  @Column({ name: 'entry_date', type: 'date' })
  entryDate!: string;

  @Column({ name: 'is_favorite', type: 'boolean', default: false })
  isFavorite!: boolean;

  @Column({ type: 'text', array: true, default: '{}' })
  tags!: string[];

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
}
