import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from './../mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const jwtToken = this.jwtService.sign({ userId: user.id });

    delete user['password'];

    return {
      ...user,
      accessToken: jwtToken,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
      });

      const userId = decoded.id;

      console.log(userId, newPassword);
      // await this.usersService.update({...userId, newPassword});
      // Find the user by ID and update the password
      // Remember to hash the newPassword before saving it to the database
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  async passwordResetMail(email: string): Promise<any> {
    const payload = { email };

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const jwtToken: any = this.jwtService.signAsync(payload, {
      expiresIn: '1h', // Token expires in 1 hour
      secret: process.env.JWT_SECRET, // Use a separate secret for reset tokens
    });

    return this.mailService.sendPasswordReset(user, jwtToken);
  }
}
