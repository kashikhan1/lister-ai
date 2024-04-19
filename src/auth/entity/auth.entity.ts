//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  provider: string | null;

  @ApiProperty()
  passwordResetToken: string | null;

  @ApiProperty()
  PasswordResetTokenExpiry: Date | null;

  @ApiProperty()
  passwordResetAt: Date | null;
}

export class ResetPasswordEntity {
  @ApiProperty()
  email: string;
  token: string;
  newPassword: string;
}

export class UserEmailEntity {
  @ApiProperty()
  email: string;
}
