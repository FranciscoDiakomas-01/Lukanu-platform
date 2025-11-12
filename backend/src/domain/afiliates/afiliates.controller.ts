import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AfiliatesService } from './afiliates.service';
import { CreateAfiliateDto } from './dto/create-afiliate.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('afiliates')
export class AfiliatesController {
  constructor(private readonly afiliatesService: AfiliatesService) {}

  @Post()
  @ApiOperation({
    summary: 'Afiliation criation',
  })
  create(
    @Body() createAfiliateDto: CreateAfiliateDto,
    @Headers('sub') userId: string,
  ) {
    return this.afiliatesService.create({
      ...createAfiliateDto,
      userId: +userId,
    });
  }

  @ApiOperation({
    summary: 'Afilifation list',
  })
  @Get()
  findAll(@Headers('sub') userId: number) {
    return this.afiliatesService.getMyAfiliations(userId);
  }
  @ApiOperation({
    summary: 'Pambala list',
  })
  @Get('pambala')
  getPablabla(
    @Headers('sub') userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.afiliatesService.getProductToAfilate(userId, page, limit);
  }
}
