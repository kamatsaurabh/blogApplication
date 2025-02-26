import { Controller, Get, Post, Req, Res, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Redirects user for Google login
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  // Google callback after successful authentication
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const jwt = await this.authService.validateOAuthLogin(req.user);
    res.redirect(`${process.env.FALLBACK_URL}${jwt.token}`);
  }

  // **NEW: Google login via Angular**
  @Post('google-login')
  async googleLoginToken(@Body('token') token: string) {
    return this.authService.validateGoogleToken(token);
  }

  // Redirects user for Facebook login
  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin() {}

  // Facebook callback after successful authentication
  @Get('facebook/callback')
  @UseGuards(FacebookAuthGuard)
  async facebookAuthRedirect(@Req() req, @Res() res) {
    const jwt = await this.authService.validateOAuthLogin(req.user);
    res.redirect(`${process.env.FALLBACK_URL}${jwt.token}`);
  }

  // **NEW: Facebook login via Angular**
  @Post('facebook-login')
  async facebookLoginToken(@Body('token') token: string) {
    return this.authService.validateFacebookToken(token);
  }
}
