import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../shared/DTO/user.dto';
import { UserId } from '../shared/DTO/userId.dto';
import { NewUser } from '../shared/DTO/newUser.dto';
import { UpdateUserMdp } from '../shared/DTO/updateUserMdp.dto';

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

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getOne(userId: UserId): Promise<User> {
    const userFoundShort = this.users.find((user) => user.id == userId);

    // let userFoundLong = this.users.find((user) => {
    //   if (user.id == userId) return user;
    //   else return undefined;
    // });

    // console.log(userFoundLong)
    // console.log(userFoundShort)
    return userFoundShort;
  }

  async create(newUser: NewUser): Promise<UserId> {
    newUser.id = this.users.length + 1;
    newUser.active = true;

    this.users.push({ ...newUser });

    return newUser.id;
  }

  async updateMdp(userId: UserId, newMdp: UpdateUserMdp): Promise<UserId> {
    const userIndexFound = this.users.findIndex((user) => user.id == userId);

    if (userIndexFound != -1) {
      this.users[userIndexFound].mdp = newMdp.mdp;
      return this.users[userIndexFound].id;
    } else {
      throw new HttpException('Erreur: User not found', HttpStatus.NOT_FOUND);
    }
  }

  async disable(userId: UserId): Promise<UserId> {
    const userIndexFound = this.users.findIndex((user) => user.id == userId);

    if (userIndexFound != -1) {
      if (this.users[userIndexFound].active == true) {
        this.users[userIndexFound].active = false;
        return this.users[userIndexFound].id;
      } else {
        throw new HttpException(
          'Erreur: User already desactivated',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException('Erreur: User not found', HttpStatus.NOT_FOUND);
    }
  }
}
