import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { encrypt, generateToken } from 'src/core/helper/cryption';
import { Response } from 'src/core/concrete/response';
import { UsersDso } from '../dsos/user.dso';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { UpdateUsersDto } from '../dtos/update-users.dto';
import { Users } from '../models/users.model';
import { Network } from 'src/core/helper/send-email';
import { ErrorResponse } from 'src/core/auth/common/error-response';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private model: typeof Users,
    private mailService: Network,
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

  async store(
    user: CreateUsersDto,
  ): Promise<Response<UsersDso> | ErrorResponse> {
    const isEmailExist = await this.findByEmail(user.email);
    if (isEmailExist) return new ErrorResponse(422, 'Email is already taken!');
    const token = await generateToken(); //Token create
    const users = await this.model.create({
      ...user,
      password: await encrypt(user.password),
      isActive: true,
      confirmationCode: token,
      isEmailConfirmed: false,
    });
    
    this.mailService.sendMailTemplate(
      users.email,
      'E-Mail Confirmation',
      new Response<UsersDso>(users),
      token,
    );
    return new Response<Users>(users);
  }

  async put(id: number, user: UpdateUsersDto) {
    const users = await this.model.update(
      { ...user, password: await encrypt(user.password), isActive: true },
      { where: { id } },
    );
    return users;
  }

  async delete(id: number) {
    const user = await this.model.findOne({ where: { id } });
    const deleted = await this.model.update(
      { ...user, isActive: false },
      { where: { id } },
    );
    return deleted;
  }

  public async findByEmail(email: string): Promise<Users | null> {
    const user = await this.model.findOne({
      where: {
        email: email,
        isActive: true,
      },
    });
    return user;
  }
  async confirmEmail(token: string) {
    const user = await this.model.findOne({
      where: {
        confirmationCode: token,
        isActive: true,
      },
    });
    const id = user.id;
    if (user.isEmailConfirmed) {
      return new ErrorResponse(300, 'You have confirmed your E-Mail!');
    }
    await this.model.update(
      { ...user, isEmailConfirmed: true },
      { where: { id } },
    );
  }
}
