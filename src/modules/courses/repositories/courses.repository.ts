import { Prisma, Course } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CoursesRepository {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async create(data: Prisma.CourseCreateInput) {
    return this.prisma.course.create({ data });
  }

  async find() {
    return this.prisma.course.findMany();
  }

  async findOne({ id }: { id: Course['id'] }) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async update({
    id,
    data,
  }: {
    id: Course['id'];
    data: Prisma.CourseUpdateInput;
  }) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete({ id }: { id: Course['id'] }) {
    return this.prisma.course.delete({ where: { id } });
  }
}
