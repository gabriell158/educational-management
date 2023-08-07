import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { UpdateFileDto } from '../dto/update-file.dto';
import { FilesService } from '../services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() { activityId }: { activityId: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.create({
      file,
      activityId: +activityId,
      name: file.originalname,
    });
  }

  @Get('download/:id')
  download(@Param('id') id: string): Promise<StreamableFile> {
    return this.filesService.download(+id);
  }

  @Get('download/:activityId/all')
  downloadAll(
    @Param('activityId') activityId: string,
  ): Promise<StreamableFile> {
    return this.filesService.downloadAll(+activityId);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
