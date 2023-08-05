import { Prisma, File } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from '../dto/create-file.dto';

@Injectable()
export class FilesRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(data: { name: string; path: string; activityId: number }) {
    return this.prisma.file.create({ data });
  }

  async find() {
    return this.prisma.file.findMany();
  }

  async findOne({ id }: { id: File['id'] }) {
    return this.prisma.file.findUnique({ where: { id } });
  }

  async update({
    id,
    data,
  }: {
    id: File['id'];
    data: Prisma.ActivityUpdateInput;
  }) {
    return this.prisma.file.update({
      where: { id },
      data,
    });
  }

  async delete({ id }: { id: File['id'] }) {
    return this.prisma.file.delete({ where: { id } });
  }
}
