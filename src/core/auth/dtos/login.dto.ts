import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email of user',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'Password of user',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(4)
  public password: string;
}
