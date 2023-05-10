import { Controller, Get } from '@nestjs/common';
import { UserService } from './_user.service';

@Controller('api/donations')
export class DonationController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllDonation() {}
}
