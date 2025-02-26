import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(private jwtService: JwtService) {}

  // ✅ Validate Google Token (used in /auth/google-login)
  async validateGoogleToken(token: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid Google token');

    const jwt = this.jwtService.sign({ sub: payload.sub, email: payload.email });
    return { accessToken: jwt };
  }

  // ✅ Validate Facebook Token (used in /auth/facebook-login)
  async validateFacebookToken(token: string) {
    const url = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`;
    const response = await axios.get(url);
    
    if (!response.data || !response.data.id) throw new Error('Invalid Facebook token');

    const jwt = this.jwtService.sign({ sub: response.data.id, email: response.data.email });
    return { accessToken: jwt };
  }

  // Used by /auth/google/callback and /auth/facebook/callback
  async validateOAuthLogin(user: any) {
    const jwt = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token: jwt };
  }
}
