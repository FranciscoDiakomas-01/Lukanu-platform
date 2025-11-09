import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AfiliatesService } from './afiliates.service';
import { CreateAfiliateDto } from './dto/create-afiliate.dto';

@Controller('afiliates')
export class AfiliatesController {
  constructor(private readonly afiliatesService: AfiliatesService) {}

  @Post()
  create(@Body() createAfiliateDto: CreateAfiliateDto) {
    return this.afiliatesService.create(createAfiliateDto);
  }

  @Get()
  findAll(@Headers('sub') userId: number) {
    return this.afiliatesService.getMyAfiliations(userId);
  }
}
