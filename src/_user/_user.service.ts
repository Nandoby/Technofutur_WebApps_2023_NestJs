import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: any[] = [
    { id: 1, login: 'Sébastien', mdp: 'Test1234', active: true },
    { id: 2, login: 'Aymeric', mdp: 'Test1234', active: true },
    { id: 3, login: 'Amandine', mdp: 'Test1234', active: true },
    { id: 4, login: 'Rémy', mdp: 'Test1234', active: true },
    { id: 5, login: 'Ferdinando', mdp: 'Test1234', active: true },
    { id: 6, login: 'Nicolas', mdp: 'Test1234', active: true },
    { id: 7, login: 'Meroine', mdp: 'Test1234', active: true },
  ];

  async getAll() {
    return this.users;
  }

  async getOne(userId: number) {
    const userFoundShort = this.users.find((user) => user.id == userId);

    // let userFoundLong = this.users.find((user) => {
    //   if (user.id == userId) return user;
    //   else return undefined;
    // });

    // console.log(userFoundLong)
    // console.log(userFoundShort)
    return userFoundShort;
  }

  async create(newUser: any) {
    const totalUser = this.users.length;
    const newId = totalUser + 1;

    if (newUser.login != undefined && newUser.mdp != undefined) {
      this.users.push({ id: newId, ...newUser });
      return newId;
    } else {
      throw new HttpException(
        'Erreur : Nombre de paramètre body incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateMdp(userId: number, newMdp: any) {
    if (newMdp.mdp == undefined)
      throw new HttpException(
        'Erreur: Nombre de paramètre body incorrect',
        HttpStatus.BAD_REQUEST,
      );

    const userIndexFound = this.users.findIndex((user) => user.id == userId);

    if (userIndexFound != -1) {
      this.users[userIndexFound].mdp = newMdp.mdp;
      return { userId: this.users[userIndexFound].id };
    } else {
      throw new HttpException('Erreur: User not found', HttpStatus.NOT_FOUND);
    }
  }

  async disable(userId: number) {
    const userIndexFound = this.users.findIndex((user) => user.id == userId);

    if (userIndexFound != -1) {
      if (this.users[userIndexFound].active == true) {
        this.users[userIndexFound].active == false;
        return { userId: this.users[userIndexFound].id };
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
