import { NgModule, provideZoneChangeDetection, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

@NgModule({
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Set to true if you want auto-login
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(`${environment.GoogleAuthKey}`),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(`${environment.FacebookAuthKey}`),
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    CommonModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }