import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private route:Router) {}

  login(email: string, password: string): Observable<any> {
    this.isLoading$.next(true);
    // Simuler un backend avec un délai
    return of(email === 'admin@demo.com' && password === 'demo' ? { email } : null).pipe(
      delay(1000), // Simule un délai de traitement
      tap(() => this.isLoading$.next(false)) // Réinitialise l'état de chargement
      
    );
    
    
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  logout() {
    this.currentUserSubject.next(null);
    this.route.navigate(['/login']);
  }
}
