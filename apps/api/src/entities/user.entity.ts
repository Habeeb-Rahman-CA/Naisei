import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Journal } from './journal.entity';
import { JournalPage } from './journal-page.entity';
import { Tag } from './tag.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column({ name: 'display_name' })
  displayName!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => Journal, (journal) => journal.user)
  journals?: Journal[];

  @OneToMany(() => JournalPage, (page) => page.user)
  pages?: JournalPage[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags?: Tag[];
}
