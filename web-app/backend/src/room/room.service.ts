import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Room} from "./entities/room.entity";

@Injectable()
export class RoomService {

  constructor(
      @InjectRepository(Room) private readonly roomRepository: Repository<Room>

  ) {}


  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }



  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async findRoomByName(roomName: string): Promise<Room> {
    return await this.roomRepository.findOne({ where: { roomName: roomName } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
