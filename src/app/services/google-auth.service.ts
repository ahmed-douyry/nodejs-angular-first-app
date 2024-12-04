import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceGoogle {
  private backendUrl = 'http://localhost:3000/auth/google'; 
  private user: SocialUser | null = null;

  constructor(private authService: SocialAuthService, private http: HttpClient) {}

  signInWithGoogle(): Promise<SocialUser> {
  if (!this.authService) {
    return Promise.reject('authService is undefined');
  }
  
  return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
    this.user = user;
    return user;
  }).catch(error => {
    console.error('Erreur de connexion Google :', error);
    throw error;
  });
}


  signOut(): Promise<void> {
    this.user = null;
    return this.authService.signOut();
  }

  authenticateWithBackend(token: string): Observable<any> {
    return this.http.post(`${this.backendUrl}`, { idToken: token });
  }
}
