import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizresponseService } from './quizresponse.service';
import { CreateQuizresponseDto } from './dto/create-quizresponse.dto';
import { UpdateQuizresponseDto } from './dto/update-quizresponse.dto';

@Controller('quizresponse')
export class QuizresponseController {
  constructor(private readonly quizresponseService: QuizresponseService) {}

  @Post()
  create(@Body() createQuizresponseDto: CreateQuizresponseDto) {
    return this.quizresponseService.create(createQuizresponseDto);
  }

  @Get()
  findAll() {
    return this.quizresponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizresponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizresponseDto: UpdateQuizresponseDto) {
    return this.quizresponseService.update(+id, updateQuizresponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizresponseService.remove(+id);
  }
}
