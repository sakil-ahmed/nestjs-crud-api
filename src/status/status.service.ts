import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Status } from './schema/status.schema';
import { Model } from 'mongoose';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status.name) private statusModel: Model<Status>) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const alreadyExist = await this.statusModel.find({
      name: createStatusDto.name,
    });
    if (alreadyExist.length > 0) {
      throw new BadRequestException('Status already exists');
    }
    const res = await this.statusModel.create(createStatusDto);
    return res;
  }

  async findAll(): Promise<Status[]> {
    return this.statusModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} status`;
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return `This action updates a #${id} status`;
  }

  remove(id: number) {
    return `This action removes a #${id} status`;
  }
}
