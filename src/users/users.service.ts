import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import {
  User
} from './users.entity';
import { UserRole } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUsername(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return await this.userRepository.findOneBy({
      refreshToken,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findManagers(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        role: Not(UserRole.USER),
      },
    });
  }

  async update(id: number, user: Partial<User>): Promise<boolean> {
    console.log(id, user);
    const result = await this.userRepository.update(id, user);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Offerwall user with ID ${id} not found`);
    }
    return true;
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Offerwall user with ID ${id} not found`);
    }
    return true;
  }
}
