import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReqResUsersRepository } from '../repositories/reqres.users.repository';

@Injectable()
export class ReqResUsersService {
  constructor(
    @Inject(ReqResUsersRepository)
    private readonly usersRepository: ReqResUsersRepository,
  ) {}

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
