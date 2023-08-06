import { Prisma, Activity } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';

@Injectable()
export class ActivitiesRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(data: CreateActivityDto) {
    return this.prisma.activity.create({ data });
  }

  async find() {
    return this.prisma.activity.findMany();
  }

  async findOne({ id }: { id: Activity['id'] }) {
    return this.prisma.activity.findUnique({ where: { id } });
  }

  async findOneWithFiles({ id }: { id: Activity['id'] }) {
    return this.prisma.activity.findUnique({
      where: { id },
      include: {
        files: {
          select: { name: true, path: true },
        },
      },
    });
  }

  async update({
    id,
    data,
  }: {
    id: Activity['id'];
    data: Prisma.ActivityUpdateInput;
  }) {
    return this.prisma.activity.update({
      where: { id },
      data,
    });
  }

  async delete({ id }: { id: Activity['id'] }) {
    return this.prisma.activity.delete({ where: { id } });
  }
}
