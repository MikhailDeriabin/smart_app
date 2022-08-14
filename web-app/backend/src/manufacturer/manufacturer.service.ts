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


 /* create(createManufacturerDto: CreateManufacturerDto) {
    return 'This action adds a new manufacturer';
  }
*/

  async findAll(): Promise<Manufacturer[]> {
    return await this.manufacturerRepository.find();
  }

  async findOne(id: string): Promise<Manufacturer>  {
    return await this.manufacturerRepository.findOneOrFail(id)
  }


  async findManufacturerByName(manufacturer: string): Promise<Manufacturer> {
    return await this.manufacturerRepository.findOne({ where: { manufacturer: manufacturer } });
  }

 /* update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    return `This action updates a #${id} manufacturer`;
  }*/

  async remove(id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findOneOrFail(id);
    await this.manufacturerRepository.remove(manufacturer);
    return manufacturer;
  }


}
