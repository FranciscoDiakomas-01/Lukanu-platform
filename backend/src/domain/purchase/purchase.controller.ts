import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import {
  CreatePurchaseDto,
  UpdatePurchaseDto,
} from './dto/create-purchase.dto';
import isAdminGuard from '@core/guards/isAdmin.guard';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  create(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @Headers('sub') userId: string,
  ) {
    return this.purchaseService.create(createPurchaseDto, +userId);
  }

  @Get()
  findAll(
    @Headers('sub') userId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.purchaseService.findAll(+userId, page, limit);
  }
  @Patch(':id')
  @UseGuards(isAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }
}
