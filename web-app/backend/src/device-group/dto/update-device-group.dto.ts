import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceGroupDto } from './create-device-group.dto';

export class UpdateDeviceGroupDto extends PartialType(CreateDeviceGroupDto) {}
