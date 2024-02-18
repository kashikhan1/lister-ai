//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;
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
