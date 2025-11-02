import { PartialType } from '@nestjs/swagger';
import { CreateNoficationDto } from './create-nofication.dto';

export class UpdateNoficationDto extends PartialType(CreateNoficationDto) {}
