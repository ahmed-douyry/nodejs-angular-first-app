import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FacebookSdkService {
  private isInitialized = false;

  constructor() {}

  initFacebookSdk(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isInitialized) {
        resolve();
        return;
      }

      (window as any).fbAsyncInit = () => {
        FB.init({
          appId: '812871074242144', 
          cookie: true,
          xfbml: true,
          version: 'v14.0', // Remplacez par la version de l'API Facebook
        });
        this.isInitialized = true;
        resolve(); // Résout la promesse après initialisation
      };

      // Ajouter dynamiquement le script du SDK si nécessaire
      if (!(window as any).FB) {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.defer = true;

        // Utilisez des gestionnaires explicites pour les événements de chargement
        script.onload = () => {
          // Assurez-vous que `fbAsyncInit` sera exécuté après le chargement
          if (typeof (window as any).fbAsyncInit === 'function') {
            (window as any).fbAsyncInit();
          }
        };
        script.onerror = () => {
          reject(new Error('Le chargement du SDK Facebook a échoué.'));
        };

        document.body.appendChild(script);
      }
    });
  }

  // Fonction pour appeler le login Facebook
  login(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.login(
        (response: any) => {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'email' } // Scopes demandés
      );
    });
  }
}
