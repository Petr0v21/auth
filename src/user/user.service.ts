import { Injectable } from '@nestjs/common';
import { User } from './graphql/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find() {
    return await this.userRepository.find();
  }

  async findByUsername(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return await this.userRepository.findOneBy({
      refreshToken,
    });
  }

  async create(args: any) {
    return await this.userRepository.save(args);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  async update(args: any) {
    return await this.userRepository.update(args.id, args);
  }
}
