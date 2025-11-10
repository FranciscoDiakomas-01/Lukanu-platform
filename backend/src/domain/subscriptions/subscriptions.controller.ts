import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDTo,
} from './dto/create-subscription.dto';
import { ApiOperation } from '@nestjs/swagger';
import isAdminGuard from '@core/guards/isAdmin.guard';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Subscription create for students',
  })
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Headers('sub') sub: string,
  ) {
    return this.subscriptionsService.create(createSubscriptionDto, +sub);
  }

  @Get()
  @ApiOperation({
    summary: 'Subscription list',
  })
  findAll(
    @Headers('sub') sub: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.subscriptionsService.findAll(page, limit, +sub);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Subscription update for admin',
  })
  @UseGuards(isAdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDTo,
  ) {
    return this.subscriptionsService.update(+id, updateSubscriptionDto.status);
  }
}
