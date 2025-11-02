import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  ParseIntPipe,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({
    summary: 'Wallet create',
  })
  create(
    @Body() createWalletDto: CreateWalletDto,
    @Headers('sub') userid: number,
  ) {
    return this.walletsService.create(createWalletDto, +userid);
  }

  @Get()
  @ApiOperation({
    summary: 'Wallet list',
  })
  findAll(@Headers('sub') userid: number) {
    return this.walletsService.findAll(+userid);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Wallet delete',
  })
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Headers('sub') userid: number,
  ) {
    return this.walletsService.remove(+id, +userid);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Wallet update',
  })
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }
}
