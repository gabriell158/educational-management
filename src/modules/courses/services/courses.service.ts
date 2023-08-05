import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CoursesRepository } from '../repositories/courses.repository';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(CoursesRepository)
    private readonly coursesRepository: CoursesRepository,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.coursesRepository.create(createCourseDto);
  }

  async findAll() {
    return this.coursesRepository.find();
  }

  async findOne(id: number) {
    const course = await this.coursesRepository.findOne({ id });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.findOne({ id });
    if (!course) throw new NotFoundException('Course not found');
    await this.coursesRepository.update({ id, data: updateCourseDto });
    return this.coursesRepository.findOne({ id });
  }

  async remove(id: number) {
    const course = await this.coursesRepository.findOne({ id });
    if (!course) throw new NotFoundException('Course not found');
    return this.coursesRepository.delete({ id });
  }
}
