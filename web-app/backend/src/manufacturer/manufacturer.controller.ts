import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.create(createManufacturerDto);
  }

  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerService.update(+id, updateManufacturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(+id);
  }
}
