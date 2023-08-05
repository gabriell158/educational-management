import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './course.controller';
import { CoursesService } from '../services/courses.service';

describe('CourseController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
