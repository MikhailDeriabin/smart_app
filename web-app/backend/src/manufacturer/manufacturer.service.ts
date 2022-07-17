import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Manufacturer} from "./entities/manufacturer.entity";

@Injectable()
export class ManufacturerService {

  constructor(
      @InjectRepository(Manufacturer) private readonly manufacturerRepository: Repository<Manufacturer>

  ) {}


  create(createManufacturerDto: CreateManufacturerDto) {
    return 'This action adds a new manufacturer';
  }

  findAll() {
    return `This action returns all manufacturer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacturer`;
  }

  async findManufacturerByName(manufacturerName: string): Promise<Manufacturer> {
    return await this.manufacturerRepository.findOne({ where: { manufacturerName: manufacturerName } });
  }

  update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return `This action updates a #${id} manufacturer`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturer`;
  }
}
