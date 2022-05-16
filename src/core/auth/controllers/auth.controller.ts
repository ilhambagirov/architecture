import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
@Controller('controllers')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.service.login(dto);
  }
}
