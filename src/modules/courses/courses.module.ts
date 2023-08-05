import { Module } from '@nestjs/common';
import { CoursesService } from './services/course.service';
import { CoursesController } from './controllers/course.controller';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
