import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Status} from "./entities/status.entity";

@Injectable()
export class StatusService {

  constructor(
      @InjectRepository(Status) private readonly statusRepository: Repository<Status>

  ) {}

  /*async create(createStatusDto: CreateStatusDto) {
    return 'This action adds a new status';
  }*/

  async findAll():Promise<Status[]> {
    return await this.statusRepository.find();
  }

  async findOne(id: string): Promise<Status> {
    return await this.statusRepository.findOneOrFail(id,{
      relations: ['device','type'],
    });
  }

  async findStatusByName(statusName: string): Promise<Status> {
    return await this.statusRepository.findOne({ where: { statusName: statusName } });
  }

  /*async update(id: number, updateStatusDto: UpdateStatusDto) {
    return await `This action updates a #${id} status`;
  }
*/
 /* async remove(id: string) {
    const status = await this.findOne(id);
    await this.statusRepository.remove(status);
    return status;
  }*/
}
