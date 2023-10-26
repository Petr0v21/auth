import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany
} from 'typeorm';
import { UserRole } from './args/userRole.enum';
import { AuthCode } from 'src/authcode/graphql/authcode.entity';

// @Unique('my_unique_constraint', ['email'])
@Entity()
@Index(['id'], { unique: true })
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('rowid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: UserRole.USER })
  @Field(() => UserRole)
  role: UserRole;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column({ nullable: true })
  @Field()
  refreshToken: string;

  @OneToMany(() => AuthCode, (authcode) => authcode.user)
  authcode?: AuthCode[];
}
