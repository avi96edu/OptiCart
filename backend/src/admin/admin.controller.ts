import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, PasswordDto, UpdateAdminDto } from './admin.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  getHello(): object {
    return this.adminService.getHello();
  }
  @Get('findselect/:username')
getSelectedAdmin(
  @Param('username') username: string,
  @Query('type') type: string,
): Promise<any> {
  return this.adminService.getSelectedAdmin(username, type);
}

@Get('findbasic/:username')
getBasicAdmin(@Param('username') username: string): Promise<any> {
  return this.adminService.getBasicAdmin(username);
}

@Get('findcontact/:username')
getAdminContact(@Param('username') username: string): Promise<any> {
  return this.adminService.getAdminContact(username);
}
  @Post('create')
  @UsePipes(new ValidationPipe())
  createAdmin(@Body() dto: CreateAdminDto): Promise<any> {
    return this.adminService.createAdmin(dto);
  }
  @Post('searchid')
searchIdByName(@Body('text') text: string): Promise<any> {
  return this.adminService.searchByName(text);
}

  @UseGuards(AuthGuard)
  @Get('getall')
  getAll(): Promise<any> {
    return this.adminService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('find/:username')
  getAdminByUsername(@Param('username') username: string): Promise<any> {
    return this.adminService.getAdminByUsername(username);
  }

  @UseGuards(AuthGuard)
  @Get('search')
  searchByName(@Query('text') text: string): Promise<any> {
    return this.adminService.searchByName(text);
  }

  @UseGuards(AuthGuard)
  @Put('update/:username')
  @UsePipes(new ValidationPipe())
  updateAdmin(
    @Param('username') username: string,
    @Body() dto: UpdateAdminDto,
  ): Promise<any> {
    return this.adminService.updateAdmin(username, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:username/password')
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Param('username') username: string,
    @Body() dto: PasswordDto,
  ): Promise<any> {
    return this.adminService.updatePassword(username, dto);
  }

  @UseGuards(AuthGuard)
  @Patch('update/:username/status')
  updateStatus(
    @Param('username') username: string,
    @Body('isActive') isActive: boolean,
  ): Promise<any> {
    return this.adminService.updateStatus(username, isActive);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:username')
  deleteAdmin(@Param('username') username: string): Promise<any> {
    return this.adminService.deleteAdmin(username);
  }
}