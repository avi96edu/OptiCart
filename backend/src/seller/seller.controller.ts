import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './seller.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @Post('create/:adminId')
  @UsePipes(new ValidationPipe())
  createSeller(
    @Param('adminId') adminId: string,
    @Body() dto: CreateSellerDto,
  ): Promise<any> {
    return this.sellerService.createSeller(adminId, dto);
  }

  @Get('admin/:adminId')
  getSellersByAdmin(@Param('adminId') adminId: string): Promise<any> {
    return this.sellerService.getSellersByAdmin(adminId);
  }

  @Get('find/:id')
  getSellerById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.sellerService.getSellerById(id);
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  updateSeller(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateSellerDto,
  ): Promise<any> {
    return this.sellerService.updateSeller(id, dto);
  }

  @Delete('delete/:id')
  deleteSeller(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.sellerService.deleteSeller(id);
  }
}