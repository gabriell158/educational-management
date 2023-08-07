import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { FilesController } from './controllers/files.controller';
import { FilesRepository } from './repositories/files.repository';
import { ActivitiesService } from '../activities/services/activities.service';
import { ActivitiesRepository } from '../activities/repositories/activities.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CoursesService } from '../courses/services/courses.service';
import { CoursesRepository } from '../courses/repositories/courses.repository';
import { MessagingModule } from '../messaging/messaging.module';
import { MessagingService } from '../messaging/services/messaging.service';

@Module({
  imports: [MessagingModule],
  controllers: [FilesController],
  providers: [
    FilesService,
    FilesRepository,
    ActivitiesService,
    ActivitiesRepository,
    PrismaService,
    CoursesService,
    CoursesRepository,
    MessagingService,
  ],
})
export class FilesModule {}
