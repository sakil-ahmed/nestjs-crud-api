import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserId } from '../common/custom.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@ApiTags('Projects')
@ApiSecurity('JWT-auth')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@UserId() userId: string, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@UserId() userId: string) {
    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
