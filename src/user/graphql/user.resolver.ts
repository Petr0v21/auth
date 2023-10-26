import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from './user.entity';
import { CreateOneUserArgs } from './args/CreateOneUserArgs';
import { UpdateOneUserArgs } from './args/UpdateOneUserArgs';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';
import { SuccessOutput } from 'src/graphql/dto/SuccessOutput.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { nullable: true })
  async findUsers(): Promise<User[]> {
    const users = await this.userService.find();
    return users;
  }

  @Query(() => User, { nullable: true })
  async findOneUser(@Args() args: UniqueArgs): Promise<User> {
    const user = await this.userService.findById(args.id);
    return user;
  }

  // TODO maybe del
  @Mutation(() => User)
  async createOneUser(@Args() args: CreateOneUserArgs): Promise<User> {
    const user = await this.userService.create(args);
    return user;
  }

  @Mutation(() => SuccessOutput)
  async deleteOneUser(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    const user = await this.userService.delete(args.id);
    return user.affected === 0 ? { success: false } : { success: true };
  }

  @Mutation(() => SuccessOutput)
  async updateOneUser(@Args() args: UpdateOneUserArgs): Promise<SuccessOutput> {
    const user = await this.userService.update(args);
    return user.affected === 0 ? { success: false } : { success: true };
  }
}
