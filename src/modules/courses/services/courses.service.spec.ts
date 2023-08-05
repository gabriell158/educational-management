import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CoursesRepository } from '../repositories/courses.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { Course } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('CourseService', () => {
  let service: CoursesService;
  let repository: CoursesRepository;
  let savedCourse: Course;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        CoursesRepository,
        { provide: PrismaService, useFactory: () => ({}) },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repository = module.get<CoursesRepository>(CoursesRepository);
    const date = new Date();
    savedCourse = {
      id: faker.number.int(),
      name: faker.lorem.text(),
      duration: faker.number.int({ max: 12 }),
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    };
  });

  it('should create a new course', async () => {
    jest
      .spyOn(repository, 'create')
      .mockImplementation(async () => savedCourse);
    const course = await service.create(savedCourse);
    expect(course.name).toBe(savedCourse.name);
    expect(course.duration).toBe(savedCourse.duration);
  });

  it('should list all courses', async () => {
    const savedCourses: Course[] = new Array(
      faker.number.int({ max: 10 }),
    ).fill(savedCourse);
    jest.spyOn(repository, 'find').mockImplementation(async () => savedCourses);
    const courses = await service.findAll();
    expect(courses).toBeInstanceOf(Array);
    expect(courses).toHaveLength(savedCourses.length);
    courses.map((course, index) => {
      expect(course.name).toBe(savedCourses[index].name);
      expect(course.duration).toBe(savedCourses[index].duration);
    });
  });

  it('should return the course with the given id', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockImplementation(async () => savedCourse);
    const course = await service.findOne(savedCourse.id);
    expect(course.id).toBe(savedCourse.id);
    expect(course.name).toBe(savedCourse.name);
    expect(course.duration).toBe(savedCourse.duration);
  });

  it('should throw an error if no course is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.findOne(faker.number.int());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Course not found');
    }
  });

  it('should throw an error if no course is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.update(faker.number.int(), {});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Course not found');
    }
  });

  it('should throw an error if no course is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.remove(faker.number.int());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Course not found');
    }
  });

  it('should update a saved user', async () => {
    const updatedData = {
      name: faker.lorem.text(),
      duration: faker.number.int({ max: 12 }),
    };
    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce(async () => savedCourse)
      .mockImplementationOnce(
        async () =>
          ({
            id: savedCourse.id,
            name: updatedData.name,
            duration: updatedData.duration,
          } as Course),
      );
    jest.spyOn(repository, 'update').mockImplementationOnce(() => null);
    const course = await service.update(savedCourse.id, updatedData);
    expect(course.id).toBe(savedCourse.id);
    expect(course.name).toBe(updatedData.name);
    expect(course.duration).toBe(updatedData.duration);
  });

  it('should delete a saved course', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce(async () => savedCourse);
    jest
      .spyOn(repository, 'delete')
      .mockImplementationOnce(async () => savedCourse);
    const deletedCourse = await service.remove(savedCourse.id);
    expect(deletedCourse).toBe(savedCourse);
  });
});
