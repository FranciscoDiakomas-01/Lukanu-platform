import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  Headers,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import isAdminGuard from '@core/guards/isAdmin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(isAdminGuard)
  @Post()
  @ApiOperation({
    summary: 'Course create, only for admin',
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @ApiOperation({
    summary: 'Course List',
  })
  @Get()
  findAll(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Headers('sub') sub: string,
  ) {
    return this.coursesService.findAll({
      limit,
      page,
      userId: +sub,
    });
  }

  @Get(':id')
  @UseGuards(isAdminGuard)
  @ApiOperation({
    summary: 'Course details only for admin',
  })
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Course update, only for admin',
  })
  @UseGuards(isAdminGuard)
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Course publish, only for admin',
  })
  @UseGuards(isAdminGuard)
  publish(@Param('id', new ParseIntPipe()) id: string) {
    return this.coursesService.publisch(+id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Course delete, only for admin',
  })
  @UseGuards(isAdminGuard)
  remove(@Param('id', new ParseIntPipe()) id: string) {
    return this.coursesService.remove(+id);
  }
}
