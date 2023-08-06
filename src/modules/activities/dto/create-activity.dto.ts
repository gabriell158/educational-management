import { IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsNumber()
  score: number;

  @IsNumber()
  courseId: number;
}
