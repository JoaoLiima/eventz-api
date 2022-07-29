import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CostumerService } from '@/modules/costumer/costumer.service';
import {
  Costumer,
  CreateCostumer,
  PaginatedCostumer,
  UpdateCostumer,
} from '@/common/interfaces';

@Controller('costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Post()
  async createCostumer(@Body() data: CreateCostumer): Promise<Costumer> {
    return this.costumerService.create(data);
  }

  @Get()
  async findAllCostumers(
    @Query('pageNumber') pageNumber,
    @Query('pageSize') pageSize,
  ): Promise<PaginatedCostumer> {
    return this.costumerService.find(pageNumber, pageSize);
  }

  @Get('by-email')
  async findByEmail(@Query('email') email: string): Promise<Costumer> {
    return this.costumerService.findByEmail(email);
  }

  @Get('by-phone')
  async findByPhone(@Query('phone') phone: string): Promise<Costumer> {
    return this.costumerService.findByPhone(phone);
  }

  @Patch()
  async update(@Body() data: UpdateCostumer): Promise<Costumer> {
    return this.costumerService.update(data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.costumerService.delete(+id);
  }
}
