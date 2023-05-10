import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../shared/DTO/users/user.dto';
import { UserId } from '../shared/DTO/users/userId.dto';
import { NewUser } from '../shared/DTO/users/newUser.dto';
import { UpdateUserMdp } from '../shared/DTO/users/updateUserMdp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../shared/entities/user.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, login: 'Sébastien', mdp: 'Test1234', active: true },
    { id: 2, login: 'Aymeric', mdp: 'Test1234', active: true },
    { id: 3, login: 'Amandine', mdp: 'Test1234', active: true },
    { id: 4, login: 'Rémy', mdp: 'Test1234', active: true },
    { id: 5, login: 'Ferdinando', mdp: 'Test1234', active: true },
    { id: 6, login: 'Nicolas', mdp: 'Test1234', active: true },
    { id: 7, login: 'Meroine', mdp: 'Test1234', active: true },
  ];

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getOne(userId: UserId): Promise<User> {
    // let userFoundLong = this.users.find((user) => {
    //   if (user.id == userId) return user;
    //   else return undefined;
    // });

    // console.log(userFoundLong)
    // console.log(userFoundShort)

    const oneUser = await this.usersRepository
      .findOneByOrFail({
        active: true,
        id: userId,
      })
      .catch(() => {
        throw new HttpException('VIDE', HttpStatus.NOT_FOUND);
      });
    return oneUser;
  }

  async create(newUser: NewUser): Promise<UserId | User> {
    const userEntityCreated = this.usersRepository.create({ ...newUser });

    const resultInsert: InsertResult = await this.usersRepository
      .insert(userEntityCreated)
      .catch(() => {
        throw new InternalServerErrorException('Error on insert user in sql');
      });

    console.log(resultInsert);
    return resultInsert.identifiers[0].id;
  }

  async updateMdp(userId: UserId, newMdp: UpdateUserMdp): Promise<UserId> {
    const userExist = await this.usersRepository
      .findOneOrFail({
        where: { id: userId },
      })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      });

    userExist.mdp = newMdp.mdp;
    const userSaved = await this.usersRepository.save(userExist).catch(() => {
      throw new InternalServerErrorException('Error on save user in sql');
    });

    const id: UserId = userSaved.id;

    return id;
  }

  async disable(userId: UserId): Promise<UserId> {
    const userExist = await this.usersRepository
      .findOneOrFail({ where: { id: userId } })
      .catch(() => {
        throw new InternalServerErrorException('Error on save user in sql');
      });

    userExist.active = false;
    const userSaved: UpdateResult = await this.usersRepository
      .update(userId, userExist)
      .catch(() => {
        throw new InternalServerErrorException('Error on save user in sql');
      });

    console.log(userSaved);

    if (userSaved.affected == 1) return userExist.id;
  }
}
