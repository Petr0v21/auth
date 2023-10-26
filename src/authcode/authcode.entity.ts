import { User } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AuthCode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  email: string;

  @Column({
    default: true,
  })
  status_active: boolean;

  @Column({
    default: new Date(Date.now() + 1000 * 60 * 5),
  })
  deadAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.authcode)
  user: User;
}
