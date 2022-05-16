import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { encrypt } from 'src/core/auth/helper/cryption';
import { Response } from 'src/core/concrete/response';
import { UsersDso } from '../dsos/user.dso';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import { Users } from '../models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private model: typeof Users,
  ) {}

  async list(): Promise<Response<UsersDso[]>> {
    const users = await this.model.findAll({
      attributes: ['id', 'name', 'lastname', 'patronymic', 'email'],
      where: {
        isActive: true,
      },
    });
    return new Response<UsersDso[]>(users);
  }
  async get(id: number): Promise<Response<UsersDso>> {
    const user = await this.model.findOne({
      attributes: ['id', 'name', 'lastname', 'patronymic', 'email'],
      where: {
        id,
        isActive: true,
      },
    });
    return new Response<UsersDso>(user);
  }

  async store(user: CreateUsersDto): Promise<Response<UsersDso>> {
    const users = await this.model.create({
      ...user,
      password: await encrypt(user.password),
      isActive: true,
    });
    return new Response<Users>(users);
  }

  async put(id: number, user: UpdateUsersDto) {
    const users = await this.model.update(
      { ...user, isActive: true },
      { where: { id } },
    );
    return users;
  }

  async delete(id: number) {
    const user = await this.model.findOne({ where: { id } });
    const deleted = await this.model.update(
      { ...user, password: await encrypt(user.password), isActive: false },
      { where: { id } },
    );
    return deleted;
  }

  public async findByEmail(email: string): Promise<Users | null> {
    const user = await this.model.findOne({
      attributes: ['email', 'password'],
      where: {
        email: email,
        isActive: true,
      },
    });
    return user;
  }
}
