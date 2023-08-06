import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsNumber()
  activityId: number;

  @IsNotEmpty()
  file: Express.Multer.File;
}
