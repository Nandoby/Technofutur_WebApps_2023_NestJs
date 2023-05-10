import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './_user.service';
import { UserDonation } from 'src/shared/DTO/donations/userDonation.dto';
import { UserId } from '../shared/DTO/users/userId.dto';
import { NewUserDonation } from '../shared/DTO/donations/newUserDonation.dto';
import { User } from '../shared/DTO/users/user.dto';

@Controller('api/donations')
export class DonationController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllDonation(): Promise<UserDonation[]> {
    return this.userService.getAllDonation();
  }

  @Get(':userId')
  getDonationByUserId(
    @Param('userId') userId: UserId,
  ): Promise<UserDonation[]> {
    return this.userService.getDonationByUserId(userId);
  }

  @Post(':userId')
  addDonationByUser(
    @Param('userId') userId: UserId,
    @Body(ValidationPipe) newUserDonation: NewUserDonation,
  ): Promise<User> {
    return this.userService.addDonationByUser(userId, newUserDonation);
  }
}
