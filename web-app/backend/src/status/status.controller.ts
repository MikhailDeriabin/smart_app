import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

 /* @Post()
  async create(@Body() createStatusDto: CreateStatusDto) {
    return await this.statusService.create(createStatusDto);
  }*/

  @Get()
  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll() {
    return await this.statusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a status' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'could not find matching status' })
  async findOne(@Param('id') id: string) {
    return await this.statusService.findOne(id);
  }

 /* @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return await this.statusService.update(+id, updateStatusDto);
  }*/

 /* @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.statusService.remove(id);
  }*/
}
