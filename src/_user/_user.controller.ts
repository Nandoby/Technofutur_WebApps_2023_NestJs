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
import { UserId } from '../shared/DTO/users/userId.dto';
import { User } from '../shared/DTO/users/user.dto';
import { NewUser } from '../shared/DTO/users/newUser.dto';
import { UpdateUserMdp } from '../shared/DTO/users/updateUserMdp.dto';

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
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  // --> GET --> /api/users/:userId
  @Get(':userId')
  getOneUser(@Param('userId') userId): Promise<User> {
    return this.userService.getOne(userId);
  }

  f;

  // --> POST --> /api/users
  @Post()
  createUser(@Body() newUser: NewUser): Promise<UserId | User> {
    return this.userService.create(newUser);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: number,
    @Body() updateUser: UpdateUserMdp,
  ): Promise<UserId> {
    return this.userService.updateMdp(userId, updateUser);
  }

  @Delete(':userId')
  disableUser(@Param('userId') userId: number): Promise<UserId> {
    return this.userService.disable(userId);
  }
}
