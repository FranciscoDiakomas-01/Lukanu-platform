import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { EbookService } from './ebook.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  @Post()
  @ApiOperation({
    summary: 'Ebook criation',
  })
  create(@Body() createEbookDto: CreateEbookDto, @Headers('sub') id: string) {
    return this.ebookService.create(createEbookDto, +id);
  }

  @Get()
  @ApiOperation({
    summary: 'Ebook list',
  })
  findAll(
    @Headers('sub') id: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('only', ParseBoolPipe) only: boolean = false,
  ) {
    return this.ebookService.findAll({
      userId: +id,
      page,
      limit,
      only,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Ebook details',
  })
  findOne(@Param('id') id: string, @Headers('sub') userid: string) {
    return this.ebookService.findOne(+id, +userid);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Ebook edition',
  })
  update(
    @Param('id') id: string,
    @Body() updateEbookDto: UpdateEbookDto,
    @Headers('sub') userId: string,
  ) {
    return this.ebookService.update(+id, updateEbookDto, +userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Ebook remotion',
  })
  remove(@Param('id') id: string, @Headers('sub') userId: string) {
    return this.ebookService.remove(+id, +userId);
  }
}
