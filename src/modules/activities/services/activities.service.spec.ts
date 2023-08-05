import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesService } from './activities.service';
import { ActivitiesRepository } from '../repositories/activities.repository';
import { Activity, Course } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CoursesService } from '../../courses/services/courses.service';
import { CoursesRepository } from '../../courses/repositories/courses.repository';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let coursesService: CoursesService;
  let repository: ActivitiesRepository;
  let savedActivity: Activity;
  let savedCourse: Course;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        ActivitiesRepository,
        CoursesService,
        CoursesRepository,
        { provide: PrismaService, useFactory: () => ({}) },
      ],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
    coursesService = module.get<CoursesService>(CoursesService);
    repository = module.get<ActivitiesRepository>(ActivitiesRepository);
    const date = new Date();
    savedCourse = {
      id: faker.number.int(),
      name: faker.lorem.text(),
      duration: faker.number.int({ max: 12 }),
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    };
    savedActivity = {
      id: faker.number.int(),
      courseId: savedCourse.id,
      name: faker.lorem.text(),
      score: faker.number.int(),
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    };
  });

  it('should create a new activity', async () => {
    jest
      .spyOn(repository, 'create')
      .mockImplementation(async () => savedActivity);
    jest
      .spyOn(coursesService, 'findOne')
      .mockImplementation(async () => savedCourse);
    const activity = await service.create(savedActivity);
    expect(activity.name).toBe(savedActivity.name);
    expect(activity.score).toBe(savedActivity.score);
    expect(activity.courseId).toBe(savedActivity.courseId);
  });

  it('should list all activities', async () => {
    const savedActivities: Activity[] = new Array(
      faker.number.int({ max: 10 }),
    ).fill(savedActivity);
    jest
      .spyOn(repository, 'find')
      .mockImplementation(async () => savedActivities);
    const activities = await service.findAll();
    expect(activities).toBeInstanceOf(Array);
    expect(activities).toHaveLength(savedActivities.length);
    activities.map((activity, index) => {
      expect(activity.name).toBe(savedActivities[index].name);
      expect(activity.score).toBe(savedActivities[index].score);
      expect(activity.courseId).toBe(savedActivities[index].courseId);
    });
  });

  it('should return the activity with the given id', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockImplementation(async () => savedActivity);
    const activity = await service.findOne(savedActivity.id);
    expect(activity.id).toBe(savedActivity.id);
    expect(activity.name).toBe(savedActivity.name);
    expect(activity.score).toBe(savedActivity.score);
    expect(activity.courseId).toBe(savedActivity.courseId);
  });

  it('should throw an error if no course is found for activity', async () => {
    jest.spyOn(coursesService, 'findOne').mockImplementation(async () => null);
    try {
      await service.create({} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Course not found');
    }
  });

  it('should throw an error if no activity is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.findOne(faker.number.int());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Activity not found');
    }
  });

  it('should throw an error if no activity is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.update(faker.number.int(), {});
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Activity not found');
    }
  });

  it('should throw an error if no activity is found', async () => {
    jest.spyOn(repository, 'findOne').mockImplementation(async () => null);
    try {
      await service.remove(faker.number.int());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Activity not found');
    }
  });

  it('should update a saved user', async () => {
    const updatedData = {
      name: faker.lorem.text(),
      score: faker.number.int(),
    };
    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce(async () => savedActivity)
      .mockImplementationOnce(
        async () =>
          ({
            id: savedActivity.id,
            name: updatedData.name,
            score: updatedData.score,
          } as Activity),
      );
    jest.spyOn(repository, 'update').mockImplementationOnce(() => null);
    const activity = await service.update(savedActivity.id, updatedData);
    expect(activity.id).toBe(savedActivity.id);
    expect(activity.name).toBe(updatedData.name);
    expect(activity.score).toBe(updatedData.score);
  });

  it('should delete a saved activity', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockImplementationOnce(async () => savedActivity);
    jest
      .spyOn(repository, 'delete')
      .mockImplementationOnce(async () => savedActivity);
    const deletedActivity = await service.remove(savedActivity.id);
    expect(deletedActivity).toBe(savedActivity);
  });
});
