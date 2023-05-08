import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './_user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CRUD -> Create (ReadAll, ReadOne) Update Delete
  /*
              RestFul
                  users/1/toutCeQueJaiBesoin NOK !!!!
          
                  --> step by step OK !!!
                  users/1/infos/telSorte1
                      users/1/infos/telSorte2
                          users/1/infos/telSorte3
                              users/1/infos/telSorte4
                                  users/1/infos/telSorte5
                                      users/1/infos/telSorte6
          
              GraphQL -> non vu en formation (sauf si vous êtes gentils et que le formateur aime les suchi...)
          */

  // --> GET --> /api/users
  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  // --> GET --> /api/users/:userId
  @Get(':userId')
  getOneUser(@Param('userId') userId) {
    return this.userService.getOne(userId);
  }

  f;

  // --> POST --> /api/users
  @Post()
  createUser(@Body() newUser: any) {
    return this.userService.create(newUser);
  }

  @Patch(':userId')
  updateUser(@Param('userId') userId: number, @Body() updateUser: any) {
    return this.userService.updateMdp(userId, updateUser);
  }

  @Delete(':userId')
  disableUser(@Param('userId') userId: number) {
    console.log(userId);
  }
}
