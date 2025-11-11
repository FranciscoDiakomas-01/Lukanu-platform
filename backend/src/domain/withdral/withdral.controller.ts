import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
  Headers,
} from '@nestjs/common';
import { WithdralService } from './withdral.service';
import {
  CreateWithdralDto,
  UpdateWithdralDto,
} from './dto/create-withdral.dto';
import { ApiOperation } from '@nestjs/swagger';
import isAdminGuard from '@core/guards/isAdmin.guard';

@Controller('withdral')
export class WithdralController {
  constructor(private readonly withdralService: WithdralService) {}

  @Post()
  @ApiOperation({
    summary: 'Withdral creation',
  })
  create(
    @Body() createWithdralDto: CreateWithdralDto,
    @Headers('sub') sub: string,
  ) {
    return this.withdralService.create(createWithdralDto, +sub);
  }

  @Get()
  @ApiOperation({
    summary: 'Withdral list',
  })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number,
    @Headers('sub') sub: string,
  ) {
    return this.withdralService.findAll(+sub, page, limit);
  }
  @ApiOperation({
    summary: 'Withdral update, only for admin',
  })
  @Patch(':id')
  @UseGuards(isAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateWithdralDto: UpdateWithdralDto,
  ) {
    return this.withdralService.update(+id, updateWithdralDto.status , updateWithdralDto.file);
  }
}
