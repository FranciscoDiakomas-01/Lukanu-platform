import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoficationsService } from './nofications.service';
import { CreateNoficationDto } from './dto/create-nofication.dto';
import { UpdateNoficationDto } from './dto/update-nofication.dto';

@Controller('nofications')
export class NoficationsController {
  constructor(private readonly noficationsService: NoficationsService) {}

  @Post()
  create(@Body() createNoficationDto: CreateNoficationDto) {
    return this.noficationsService.create(createNoficationDto);
  }

  @Get()
  findAll() {
    return this.noficationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noficationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoficationDto: UpdateNoficationDto) {
    return this.noficationsService.update(+id, updateNoficationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noficationsService.remove(+id);
  }
}
