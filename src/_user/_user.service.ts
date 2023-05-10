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
import { UserDonationEntity } from 'src/shared/entities/userDonation.entity';
import { UserDonation } from 'src/shared/DTO/donations/userDonation.dto';
import { NewUserDonation } from 'src/shared/DTO/donations/newUserDonation.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserDonationEntity)
    private userDonationRepository: Repository<UserDonationEntity>,
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

  /*
   * Part Relational Entities
   */

  async getAllDonation(): Promise<UserDonation[]> {
    // si on part de donation controller -< on aura a faire get all donation join user
    const datas = await this.userDonationRepository.find({
      select: { type: true, qty_in_kg: true, user: { login: true } },
      relations: { user: true },
      //where : { user : { active : true } }
    });

    //si on part de user controller -> on aura à faire get all user join donation
    /*let datas = await this.usersRepo.find({
            select : { donation : { type : true}, login : true},
            relations : { donation : true}
        })
        console.log(datas)*/

    //pour l'exemple nous verrons les deux facon
    return datas;
  }

  async getDonationByUserId(userId: UserId): Promise<UserDonation[]> {
    const datas = await this.userDonationRepository.find({
      where: { user: { id: userId } },
    });

    return datas;
  }

  async addDonationByUser(userId: UserId, newUserDonation: NewUserDonation) {
    const user: UserEntity = await this.usersRepository
      .findOneOrFail({
        where: { active: true, id: userId },
        relations: { donation: true },
      })
      .catch(() => {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      });

    let newDonation = this.userDonationRepository.create(newUserDonation);
    newDonation = await this.userDonationRepository.save(newDonation);

    user.donation.push(newDonation);
    const returnCreateDonationUser = await this.usersRepository.save(user)

    return returnCreateDonationUser;
  }
}
