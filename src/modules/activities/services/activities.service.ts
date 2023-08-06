import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { UpdateActivityDto } from '../dto/update-activity.dto';
import { ActivitiesRepository } from '../repositories/activities.repository';
import { CoursesService } from '../../courses/services/courses.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @Inject(ActivitiesRepository)
    private readonly activitiesRepository: ActivitiesRepository,
    @Inject(CoursesService) private readonly coursesService: CoursesService,
  ) {}

  async create({ courseId, ...data }: CreateActivityDto) {
    const course = await this.coursesService.findOne(courseId);
    if (!course) throw new NotFoundException('Course not found');
    return this.activitiesRepository.create({ ...data, courseId });
  }

  async findAll() {
    return this.activitiesRepository.find();
  }

  async findOne(id: number) {
    const activity = await this.activitiesRepository.findOne({ id });
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  async findFiles(id: number) {
    const activity = await this.activitiesRepository.findOneWithFiles({ id });
    if (!activity) throw new NotFoundException('Activity not found');
    return activity.files;
  }

  async update(id: number, updateActivityeDto: UpdateActivityDto) {
    const activity = await this.activitiesRepository.findOne({ id });
    if (!activity) throw new NotFoundException('Activity not found');
    if (updateActivityeDto.courseId)
      await this.coursesService.findOne(updateActivityeDto.courseId);
    await this.activitiesRepository.update({ id, data: updateActivityeDto });
    return this.activitiesRepository.findOne({ id });
  }

  async remove(id: number) {
    const activity = await this.activitiesRepository.findOne({ id });
    if (!activity) throw new NotFoundException('Activity not found');
    return this.activitiesRepository.delete({ id });
  }
}
