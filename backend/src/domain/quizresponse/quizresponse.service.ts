import { Injectable } from '@nestjs/common';
import { CreateQuizresponseDto } from './dto/create-quizresponse.dto';
import { UpdateQuizresponseDto } from './dto/update-quizresponse.dto';

@Injectable()
export class QuizresponseService {
  create(createQuizresponseDto: CreateQuizresponseDto) {
    return 'This action adds a new quizresponse';
  }

  findAll() {
    return `This action returns all quizresponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizresponse`;
  }

  update(id: number, updateQuizresponseDto: UpdateQuizresponseDto) {
    return `This action updates a #${id} quizresponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizresponse`;
  }
}
