import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/domains/users/models/users.model';
import { UsersService } from 'src/domains/users/services/services.service';
import { LoginDto } from '../dtos/login.dto';
import { compare } from '../helper/cryption';
import { AuthUserDso } from '../dsos/auth-user.dso';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async validateUser(dto: LoginDto) {
    const user = await this.getUserByEmail(dto);
    if (user) {
      return await compare(dto.password, user.password);
    }
    return false;
  }

  private async getUserByEmail(dto: LoginDto): Promise<Users | null> {
    return await this.userService.findByEmail(dto.email);
  }

  public async login(dto: LoginDto) {
    const userValid = await this.validateUser(dto);
    if (userValid) {
      const user = await this.getUserByEmail(dto);
      const tokenData = new AuthUserDso(user);
      return await this.jwtService.signAsync({ ...tokenData });
    } else {
      throw new UnauthorizedException();
    }
  }
}
