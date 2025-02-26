import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ConfigEnum } from '../Enum/config.enum';
import { AuthResponse } from '../interface/auth.interface';
import { environment } from '../../environments/environment.prod';

describe('AuthService', () => {
  let service: AuthService;
  let authServiceMock: any;
  let httpMock: HttpTestingController;

  const mockUser: SocialUser = {
    id: '123456',
    email: 'test@example.com',
    name: 'Test User',
    photoUrl: 'http://test.com/photo.jpg',
    firstName: 'Test',
    lastName: 'User',
    authToken: 'mockFacebookToken',
    idToken: 'mockGoogleToken',
    provider: 'GOOGLE',
    response: null
  };

  const mockAuthResponse: AuthResponse = {
    accessToken: 'mockJwtToken',
    user: { id: '1', email: 'test@example.com' }
  };

  beforeEach(() => {
    authServiceMock = {
      authState: of(mockUser),
      signIn: jest.fn().mockResolvedValue(mockUser),
      signOut: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: SocialAuthService, useValue: authServiceMock }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform Google login and store token', (done) => {
    service.googleLogin().subscribe(response => {
      expect(response).toEqual(mockAuthResponse);
      expect(localStorage.getItem(ConfigEnum.JWT)).toBe(mockAuthResponse.accessToken);
      done();
    });

    const req = httpMock.expectOne(`${environment.Url}${ConfigEnum.Auth}${ConfigEnum.GoogleLogin}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token: mockUser.idToken });
    req.flush(mockAuthResponse);
  });

  it('should perform Facebook login and store token', (done) => {
    service.facebookLogin().subscribe(response => {
      expect(response).toEqual(mockAuthResponse);
      expect(localStorage.getItem(ConfigEnum.JWT)).toBe(mockAuthResponse.accessToken);
      done();
    });

    const req = httpMock.expectOne(`${environment.Url}${ConfigEnum.Auth}${ConfigEnum.FacebookLogin}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token: mockUser.authToken });
    req.flush(mockAuthResponse);
  });

  it('should remove JWT token on logout', () => {
    localStorage.setItem(ConfigEnum.JWT, 'mockJwtToken');
    service.logout();
    expect(localStorage.getItem(ConfigEnum.JWT)).toBeNull();
    expect(authServiceMock.signOut).toHaveBeenCalled();
  });

  it('should check authentication status correctly', () => {
    localStorage.setItem(ConfigEnum.JWT, 'mockJwtToken');
    expect(service.isAuthenticated()).toBeTrue();

    localStorage.removeItem(ConfigEnum.JWT);
    expect(service.isAuthenticated()).toBeFalse();
  });
});
