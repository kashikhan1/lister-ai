import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable, Logger } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    _req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;
      const user = {
        email: emails?.[0]?.value || null,
        firstName: name?.givenName || null,
        lastName: name?.familyName || null,
        picture: photos?.[0]?.value || null,
        accessToken,
      };
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
