import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Type} from "./entities/type.entity";

@Injectable()
export class TypeService {

  constructor(
      @InjectRepository(Type) private readonly typeRepository: Repository<Type>

  ) {}


  /*create(createTypeDto: CreateTypeDto) {
    return 'This action adds a new type';
  }*/

  async findAll(): Promise<Type[]> {
    return await this.typeRepository.find({
      relations: ['device', 'manufacturer','status'],
    });
  }

  async findOne(id: string): Promise<Type> {
    return await this.typeRepository.findOneOrFail(id,{
      relations: ['device', 'manufacturer','status'],
    });
  }

  async findTypeByName(type: string): Promise<Type> {
    return await this.typeRepository.findOne({ where: { type: type } });
  }

  /*update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }*/
}
