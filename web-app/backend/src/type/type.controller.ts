import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

 /* @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.create(createTypeDto);
  }*/

  @Get()
  @ApiOperation({ summary: 'Get all types' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll() {
    return await this.typeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a type' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'could not find matching type' })
  async findOne(@Param('id') id: string) {
    return await this.typeService.findOne(id);
  }

/*  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typeService.update(+id, updateTypeDto);
  }*/

/*  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeService.remove(+id);
  }*/
}
