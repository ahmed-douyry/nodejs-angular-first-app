import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class GoogleAuthService {
  private clientId = '1011541733762-6odmumlhq4nut9vseoghhvm2m9pch0hi.apps.googleusercontent.com';

  constructor() {
    this.initializeGoogleSignIn();
  }

  // Initialize Google Sign-In
  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
    });
  }

  // Display Google Sign-In prompt
  promptGoogleSignIn(): void {
    google.accounts.id.prompt();
  }

  // Handle the response from Google
  handleCredentialResponse(response: any): void {
    const user = JSON.parse(atob(response.credential.split('.')[1]));
    console.log('User Info:', user);

    // Send the token or user info to the backend for further processing
  }
}
