import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { ActivitiesService } from '../../activities/services/activities.service';
import { FilesRepository } from '../repositories/files.repository';

@Injectable()
export class FilesService {
  constructor(
    @Inject(ActivitiesService)
    private readonly activitiesService: ActivitiesService,
    @Inject(FilesRepository)
    private readonly filesRepository: FilesRepository,
  ) {}

  async create({ activityId, name }: CreateFileDto) {
    await this.activitiesService.findOne(activityId);
    return this.filesRepository.create({ name, path: '', activityId });
  }

  async findAll() {
    return this.filesRepository.find();
  }

  async findOne(id: number) {
    const file = await this.filesRepository.findOne({ id });
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const file = await this.filesRepository.findOne({ id });
    if (!file) throw new NotFoundException('Activity not found');
    if (updateFileDto.activityId)
      await this.activitiesService.findOne(updateFileDto.activityId);
    await this.filesRepository.update({ id, data: updateFileDto });
    return this.filesRepository.findOne({ id });
  }

  async remove(id: number) {
    const file = await this.filesRepository.findOne({ id });
    if (!file) throw new NotFoundException('Activity not found');
    return this.filesRepository.delete({ id });
  }
}
