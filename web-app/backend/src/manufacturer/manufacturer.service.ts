import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  create(createManufacturerDto: CreateManufacturerDto) {
    return 'This action adds a new manufacturer';
  }

  findAll() {
    return `This action returns all manufacturer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacturer`;
  }

  update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return `This action updates a #${id} manufacturer`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturer`;
  }
}
