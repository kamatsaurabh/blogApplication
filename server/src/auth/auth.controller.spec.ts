import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      validateGoogleToken: jest.fn().mockResolvedValue({ accessToken: 'mockedGoogleToken' }),
      validateFacebookToken: jest.fn().mockResolvedValue({ accessToken: 'mockedFacebookToken' }),
      validateOAuthLogin: jest.fn().mockResolvedValue({ token: 'mockedOAuthToken' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return a JWT token when logging in with Google', async () => {
    const token = 'testGoogleToken';
    const result = await authController.googleLoginToken(token);
    
    expect(result).toEqual({ accessToken: 'mockedGoogleToken' });
    expect(authService.validateGoogleToken).toHaveBeenCalledWith(token);
  });

  it('should return a JWT token when logging in with Facebook', async () => {
    const token = 'testFacebookToken';
    const result = await authController.facebookLoginToken(token);

    expect(result).toEqual({ accessToken: 'mockedFacebookToken' });
    expect(authService.validateFacebookToken).toHaveBeenCalledWith(token);
  });

  it('should return a JWT token after OAuth login', async () => {
    const mockUser = { id: '123', email: 'user@example.com' };
    const req = { user: mockUser };
    const res = { redirect: jest.fn() };

    await authController.googleAuthRedirect(req, res);

    expect(authService.validateOAuthLogin).toHaveBeenCalledWith(mockUser);
    expect(res.redirect).toHaveBeenCalledWith(`${process.env.FALLBACK_URL}mockedOAuthToken`);
  });
});
