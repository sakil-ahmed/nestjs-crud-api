import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const { title, status, description } = createTaskDto;
    const foundParent = await this.taskModel.find({
      name: title,
    });
    if (foundParent.length > 0)
      throw new BadRequestException('Task already exists');

    const res = await this.taskModel.create({
      title,
      status,
      description,
      createdBy: userId,
    });
    return res;
  }

  async findAll(userId: string): Promise<Task[]> {
    const res = await this.taskModel.find({ createdBy: userId });
    return res;
  }

  async findOne(id: string): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Enter a valid mongodb id.');
    }
    const res = await this.taskModel.findById(id);
    if (!res) {
      throw new NotFoundException({ message: 'Task not found' });
    }
    return res;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Enter a valid mongodb id.');
    }
    const data = await this.taskModel.findById(id);
    if (!data) {
      throw new BadRequestException('Item Not Exist');
    }

    const res = await this.taskModel.findByIdAndUpdate(id, updateTaskDto);
    return res;
  }

  async remove(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Enter a Valid Mongodb Id');
    }

    const res = await this.taskModel.findById(id);
    if (!res) {
      throw new BadRequestException('Item Not Exist');
    }
    return this.taskModel.findByIdAndDelete(id);
  }
}
