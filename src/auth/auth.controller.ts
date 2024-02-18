//src/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthEntity,
  ResetPasswordEntity,
  UserEmailEntity,
} from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('password-forget')
  @ApiOkResponse({ type: UserEmailEntity })
  async forgetPassword(@Body() { email }: UserEmailEntity) {
    return this.authService.passwordResetMail(email);
  }

  @Post('reset-forget')
  @ApiOkResponse({ type: ResetPasswordEntity })
  async resetPassword(@Body() { token, newPassword }: ResetPasswordEntity) {
    return this.authService.resetPassword(token, newPassword);
  }
}
