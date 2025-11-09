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
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UpdateUserPassword } from './dto/update-user.dto';
import isAdminGuard from '@core/guards/isAdmin.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(isAdminGuard)
  @ApiOperation({
    summary: 'User list , only for admin',
  })
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 20,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Get('me')
  @ApiOperation({
    summary: 'User profile details',
  })
  findOne(@Headers('sub') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('me')
  @ApiOperation({
    summary: 'User profile update',
  })
  update(@Headers('sub') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @Put('me')
  @ApiOperation({
    summary: 'User password update',
  })
  updatecredentials(
    @Headers('sub') id: string,
    @Body() data: UpdateUserPassword,
  ) {
    return this.usersService.updateCredential(+id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'User profile deletion , only for admin',
  })
  @UseGuards(isAdminGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
