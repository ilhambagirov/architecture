import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import { UsersService } from '../services/services.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @ApiOperation({
    summary: 'List of Users',
    description: '[Public] Get list of Users',
  })
  @Get()
  async list() {
    return await this.service.list();
  }

  @ApiOperation({
    summary: 'Detils of given User',
    description: '[Public] Detils of given User',
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  async get(@Param() params) {
    return await this.service.get(params.id);
  }

  @ApiOperation({
    summary: 'Create User',
    description: '[Public] Create Users',
  })
  @Post()
  async store(@Body() body: CreateUsersDto) {
    return await this.service.store(body);
  }

  @ApiOperation({
    summary: 'Update User',
    description: '[AuthRequired] Update Users',
  })
  @ApiParam({ name: 'id' })
  @Put(':id')
  async put(@Param() params, @Body() body: UpdateUsersDto) {
    return await this.service.put(params.id, body);
  }

  @ApiOperation({
    summary: 'Delete User',
    description: '[AuthRequired] Delete Users',
  })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  async delete(@Param() params) {
    return await this.service.delete(params.id);
  }
}
