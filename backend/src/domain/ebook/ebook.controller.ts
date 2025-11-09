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
} from '@nestjs/common';
import { EbookService } from './ebook.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';

@Controller('ebook')
export class EbookController {
  constructor(private readonly ebookService: EbookService) {}

  @Post()
  create(@Body() createEbookDto: CreateEbookDto, @Headers('sub') id: string) {
    return this.ebookService.create(createEbookDto, +id);
  }

  @Get()
  findAll(
    @Headers('sub') id: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.ebookService.findAll({
      userId: +id,
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('sub') userid: string) {
    return this.ebookService.findOne(+id, +userid);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEbookDto: UpdateEbookDto,
    @Headers('sub') userId: string,
  ) {
    return this.ebookService.update(+id, updateEbookDto, +userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('sub') userId: string) {
    return this.ebookService.remove(+id, +userId);
  }
}
