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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('status')
@ApiTags('Status')
@ApiSecurity('JWT-auth')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.statusService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.statusService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
  //   return this.statusService.update(+id, updateStatusDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.statusService.remove(+id);
  // }
}
