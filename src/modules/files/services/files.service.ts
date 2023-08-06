import {
  Inject,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { ActivitiesService } from '../../activities/services/activities.service';
import { FilesRepository } from '../repositories/files.repository';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import archiver from 'archiver';

@Injectable()
export class FilesService {
  constructor(
    @Inject(ActivitiesService)
    private readonly activitiesService: ActivitiesService,
    @Inject(FilesRepository)
    private readonly filesRepository: FilesRepository,
  ) {}

  async create({ activityId, name, file }: CreateFileDto) {
    await this.activitiesService.findOne(activityId);
    const path = join(process.cwd(), 'files', Math.random() + name);

    const [savedFile] = await Promise.all([
      this.filesRepository.create({ name, path, activityId }),
      writeFile(path, file.buffer),
    ]);
    return savedFile;
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
    await this.findOne(id);
    return this.filesRepository.delete({ id });
  }

  async download(id: number) {
    const { path } = await this.findOne(id);
    const file = createReadStream(path);
    return new StreamableFile(file);
  }

  async downloadAll(activityId: number) {
    const files = await this.activitiesService.findFiles(activityId);
    const writetream = createWriteStream(process.cwd() + '/files.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });
    // archive.on('end', () => {
    //   console.log('finished');
    // });
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
      } else throw err;
    });
    archive.on('error', function (err) {
      throw err;
    });
    files.map(({ path, name }) => {
      archive.append(createReadStream(path), { name: name + Math.random() });
    });
    archive.pipe(writetream);
    await archive.finalize();
    return new StreamableFile(createReadStream(process.cwd() + '/files.zip'));
  }
}
