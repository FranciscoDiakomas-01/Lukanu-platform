import {
  Controller,
  Get,
  Headers,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NoficationsService } from './nofications.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('nofications')
export class NoficationsController {
  constructor(private readonly noficationsService: NoficationsService) {}

  @Get()
  @ApiOperation({
    summary: 'list',
  })
  findAll(
    @Headers('sub') userId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.noficationsService.findAll(+userId, page, limit);
  }

}
