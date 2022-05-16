import { Users } from 'src/domains/users/models/users.model';

export class AuthUserDso {
  name: string;
  lastname: string;
  patronymic: string;
  email: string;
  constructor(user: Users) {
    this.name = user.name;
    this.lastname = user.lastname;
    this.patronymic = user.patronymic;
    this.email = user.email;
  }
}
