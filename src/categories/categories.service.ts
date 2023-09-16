import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const foundParent = await this.categoryModel.find({
      name: createCategoryDto.name,
    });
    if (foundParent.length > 0)
      throw new BadRequestException('Category already exists');
    const res = await this.categoryModel.create(createCategoryDto);
    return res;
  }

  async findAll(): Promise<Category[]> {
    const res = await this.categoryModel.find();
    return res;
  }

  async findOne(id: string): Promise<Category> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Enter a valid mongodb id.');
    }
    const res = await this.categoryModel.findById(id);
    if (!res) {
      throw new NotFoundException({ message: 'Category not found' });
    }
    return res;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Enter a valid mongodb id.');
    }
    const data = await this.categoryModel.findById(id);
    if (!data) {
      throw new BadRequestException('Item Not Exist');
    }
    const res = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
    );
    return res;
  }

  async remove(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Enter a Valid Mongodb Id');
    }
    const res = await this.categoryModel.findById(id);
    if (!res) {
      throw new BadRequestException('Item Not Exist');
    }
    return this.categoryModel.findByIdAndDelete(id);
  }
}
