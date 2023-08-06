import { Module } from '@nestjs/common';
import { CoursesService } from './services/courses.service';
import { CoursesController } from './controllers/course.controller';
import { CoursesRepository } from './repositories/courses.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, PrismaService],
})
export class CoursesModule {}
