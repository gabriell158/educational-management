import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({ ...createUserDto, role: {} });
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.update({ id, data: updateUserDto });
    return this.usersRepository.findOne({ id });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new NotFoundException('User not found');
    return this.usersRepository.delete({ id });
  }
}
