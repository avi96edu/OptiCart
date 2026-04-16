import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './profile.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('create/:adminId')
  @UsePipes(new ValidationPipe())
  createProfile(
    @Param('adminId') adminId: string,
    @Body() dto: CreateProfileDto,
  ): Promise<any> {
    return this.profileService.createProfile(adminId, dto);
  }

  @Get('admin/:adminId')
  getProfileByAdmin(@Param('adminId') adminId: string): Promise<any> {
    return this.profileService.getProfileByAdmin(adminId);
  }

  @Put('update/:adminId')
  @UsePipes(new ValidationPipe())
  updateProfile(
    @Param('adminId') adminId: string,
    @Body() dto: CreateProfileDto,
  ): Promise<any> {
    return this.profileService.updateProfile(adminId, dto);
  }

  @Delete('delete/:adminId')
  deleteProfile(@Param('adminId') adminId: string): Promise<any> {
    return this.profileService.deleteProfile(adminId);
  }
}