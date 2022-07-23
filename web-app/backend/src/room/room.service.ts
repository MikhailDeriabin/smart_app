import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Room} from "./entities/room.entity";
import {DeviceGroup} from "../device-group/entities/device-group.entity";



@Injectable()
export class RoomService {

  constructor(
      @InjectRepository(Room) private readonly roomRepository: Repository<Room>

  ) {}


  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = new Room();
    room.room = createRoomDto.room
    return await this.roomRepository.save(room);
  }


  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find({ relations: ['device'] });
  }

  async findOne(id: string): Promise<Room> {
    return await this.roomRepository.findOneOrFail(id, {
      relations: ['device'],
    });
  }

  async findRoomByName(roomName: string): Promise<Room> {
    return await this.roomRepository.findOne({ where: { roomName: roomName } });
  }


  /* async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    return await`This action updates a #${id} room`;
  }*/

  async remove(id: string): Promise<Room> {
    const room = await this.findOne(id);
    await this.roomRepository.remove(room);
    return room;
  }
}
