import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsPositive, IsUrl } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  courseId: number;
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  order: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  videoURl: string;
  @ApiProperty()
  @IsArray({
    each: true,
  })
  @IsNotEmpty()
  tags: string[];
}
