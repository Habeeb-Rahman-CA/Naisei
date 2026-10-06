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

@Entity('tags')
@Index(['userId', 'name'])
export class Tag {
  @PrimaryColumn('uuid')
  id!: string; // Client-generated UUIDv7

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 32, nullable: true })
  color?: string;

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
