import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { ConfigEnum } from '../Enum/config.enum';
import { AuthResponse } from '../interface/auth.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.Url}${ConfigEnum.Auth}`;
  private user: SocialUser | null = null;

  constructor(private authService: SocialAuthService, private http: HttpClient) {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  public googleLogin(): Observable<AuthResponse> {
    return new Observable<AuthResponse>(observer => {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
        this.http.post<AuthResponse>(`${this.baseUrl}${ConfigEnum.GoogleLogin}`, { token: user.idToken })
          .subscribe((response: AuthResponse) => {
            localStorage.setItem(ConfigEnum.JWT, response.accessToken);
            observer.next(response);
            observer.complete();
          }, error => {
            observer.error(error);
          });
      }).catch(error => observer.error(error));
    });
  }


  public facebookLogin(): Observable<AuthResponse> {
    return new Observable<AuthResponse>(observer => {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
        this.http.post<AuthResponse>(`${this.baseUrl}${ConfigEnum.FacebookLogin}`, { token: user.authToken })
          .subscribe((response: AuthResponse) => {
            localStorage.setItem(ConfigEnum.JWT, response.accessToken);
            observer.next(response);
            observer.complete();
          }, error => {
            observer.error(error);
          });
      }).catch(error => observer.error(error));
    });
  }
  

  public logout(): void {
    this.authService.signOut();
    localStorage.removeItem(ConfigEnum.JWT);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(ConfigEnum.JWT);
  }
}
