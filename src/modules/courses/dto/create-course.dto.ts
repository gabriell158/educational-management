import { IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;
}
