import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: any[] = [
    { id: 1, login: 'Sébastien', mdp: 'Test1234' },
    { id: 2, login: 'Aymeric', mdp: 'Test1234' },
    { id: 3, login: 'Amandine', mdp: 'Test1234' },
    { id: 4, login: 'Rémy', mdp: 'Test1234' },
    { id: 5, login: 'Ferdinando', mdp: 'Test1234' },
    { id: 6, login: 'Nicolas', mdp: 'Test1234' },
    { id: 7, login: 'Meroine', mdp: 'Test1234' },
  ];

  async getAll() {
    return this.users;
  }

  async getOne(userId: number) {
    let userFoundShort = this.users.find((user) => user.id == userId);

    let userFoundLong = this.users.find((user) => {
      if (user.id == userId) return user;
      else return undefined;
    });

    // console.log(userFoundLong)
    // console.log(userFoundShort)
    return userFoundShort;
  }

  async create(newUser: any) {
    let totalUser = this.users.length;
    let newId = totalUser + 1;

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

  async update() {}

  async disable() {}
}
