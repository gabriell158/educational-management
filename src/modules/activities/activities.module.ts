import { Module } from '@nestjs/common';
import { ActivitiesController } from './controllers/activities.controller';
import { ActivitiesService } from './services/activities.service';
import { ActivitiesRepository } from './repositories/activities.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CoursesService } from '../courses/services/courses.service';
import { CoursesRepository } from '../courses/repositories/courses.repository';

@Module({
  controllers: [ActivitiesController],
  providers: [
    ActivitiesService,
    ActivitiesRepository,
    CoursesService,
    CoursesRepository,
    PrismaService,
  ],
})
export class ActivitiesModule {}
