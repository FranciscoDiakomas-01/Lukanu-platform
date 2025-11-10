import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import isAdminGuard from '@core/guards/isAdmin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @ApiOperation({
    summary: 'Lesson creation , only for admin',
  })
  @UseGuards(isAdminGuard)
  create(
    @Body() createLessonDto: CreateLessonDto,
    @Headers('sub') sub: string,
  ) {
    return this.lessonsService.create(createLessonDto, +sub);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Lesson update , only for admin',
  })
  @UseGuards(isAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateLessonDto: CreateLessonDto,
  ) {
    return this.lessonsService.update(+id, updateLessonDto);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Lesson remotion , only for admin',
  })
  @UseGuards(isAdminGuard)
  remove(@Param('id', ParseIntPipe) id: string, @Headers('sub') sub: string) {
    return this.lessonsService.remove(+id, +sub);
  }
}
