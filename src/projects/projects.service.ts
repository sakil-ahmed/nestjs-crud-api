import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/project.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<any> {
    const { name, members } = createProjectDto;
    if (members) {
      if (!members.every((id) => mongoose.isValidObjectId(id))) {
        throw new BadRequestException('Enter a valid mongodb id');
      }
    }
    const project = await this.projectModel.create({
      name,
      members: members ? [...members, userId] : [userId],
      createdBy: userId,
    });
    return project;
  }

  findAll(userId: string) {
    return this.projectModel.find({ createdBy: userId });
  }

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Enter a valid Mongodb id');
    }
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id}project`;
  }

  async remove(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Enter a valid Mongodb id');
    }
    const project = await this.findOne(id);
    if (!project) {
      throw new BadRequestException('Project not Exist');
    }
    return this.projectModel.findByIdAndDelete(id);
  }
}
