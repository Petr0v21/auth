import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { UserRole } from './types';
import { AuthCode } from 'src/authcode/authcode.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  login: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  number: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => AuthCode, (authcode) => authcode.user)
  authcode?: AuthCode[];
}
