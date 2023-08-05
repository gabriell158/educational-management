import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async find() {
    return this.prisma.user.findMany();
  }

  async findOne({ id }: { id: User['id'] }) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update({ id, data }: { id: User['id']; data: Prisma.UserUpdateInput }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete({ id }: { id: User['id'] }) {
    return this.prisma.user.delete({ where: { id } });
  }
}
