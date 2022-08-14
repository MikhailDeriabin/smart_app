import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

 /* @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.create(createManufacturerDto);
  }*/

  @Get()
  @ApiOperation({ summary: 'Get all manufacturers' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll() {
    return await  this.manufacturerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a manufacturer' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'could not find matching manufacturer id' })
  async findOne(@Param('id') id: string) {
    return await this.manufacturerService.findOne(id);
  }

 /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerService.update(+id, updateManufacturerDto);
  }
*/
  @Delete(':id')
  @ApiOperation({summary: 'Updated'})
  @ApiResponse({status:200, description: 'Ok'})
  @ApiResponse({status:404, description: 'could not find matching manufacturer id'})
  async remove(@Param('id') id: string) {
    return await  this.manufacturerService.remove(id);
  }
}
