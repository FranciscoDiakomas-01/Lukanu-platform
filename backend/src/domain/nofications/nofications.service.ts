import { Injectable } from '@nestjs/common';
import { CreateNoficationDto } from './dto/create-nofication.dto';
import { UpdateNoficationDto } from './dto/update-nofication.dto';

@Injectable()
export class NoficationsService {
  create(createNoficationDto: CreateNoficationDto) {
    return 'This action adds a new nofication';
  }

  findAll() {
    return `This action returns all nofications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nofication`;
  }

  update(id: number, updateNoficationDto: UpdateNoficationDto) {
    return `This action updates a #${id} nofication`;
  }

  remove(id: number) {
    return `This action removes a #${id} nofication`;
  }
}
