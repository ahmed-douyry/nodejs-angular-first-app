import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ExempleService } from './services/exemple.service';
import { AuthServiceGoogle } from './services/google-auth.service';
import { AuthService } from './services/auth.service';
import { SocialAuthServiceConfig, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ExempleService,
    AuthServiceGoogle,
    AuthService,
    SocialAuthService,
    
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, 
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1011541733762-6odmumlhq4nut9vseoghhvm2m9pch0hi.apps.googleusercontent.com'), // Remplacez par votre client ID Google
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // Facultatif
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1011541733762-6odmumlhq4nut9vseoghhvm2m9pch0hi.apps.googleusercontent.com'), // Assurez-vous que l'ID client Google est correct
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
};
