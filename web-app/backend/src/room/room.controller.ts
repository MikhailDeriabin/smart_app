import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Room} from "./entities/room.entity";


@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiCreatedResponse({
    description: 'The room has been successfully created ',
    type: Room
  })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Ok' })
  async findAll() {
    return await this.roomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'could not find matching room' })
  async findOne(@Param('id') id: string) {
    return await this.roomService.findOne(id);
  }

  /*@Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return await this.roomService.update(id, updateRoomDto);
  }*/

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiResponse({ status: 200, description: 'Deleted' })
  @ApiResponse({ status: 404, description: 'could not find matching room' })
  async remove(@Param('id') id: string) {
    return await this.roomService.remove(id);
  }
}
