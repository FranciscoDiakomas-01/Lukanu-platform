import { PartialType } from '@nestjs/swagger';
import { CreateQuizresponseDto } from './create-quizresponse.dto';

export class UpdateQuizresponseDto extends PartialType(CreateQuizresponseDto) {}
