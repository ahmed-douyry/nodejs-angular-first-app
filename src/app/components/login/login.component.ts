import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FacebookSdkService } from '../../services/auth.service-facebook.service';
import { AuthServiceGoogle } from '../../services/google-auth.service';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterOutlet],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  user: SocialUser | null = null;

  loginForm!: FormGroup;
  hasError!: boolean;
  returnUrl!: string;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = []; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private Authfb : FacebookSdkService,
    private route: ActivatedRoute,
    private router: Router,
    private authsergo : AuthServiceGoogle
  ) {
    this.isLoading$ = this.authService.isLoading$;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.Authfb.initFacebookSdk()
    .then(() => console.log('SDK Facebook initialisé avec succès'))
    .catch((err) => console.error('Erreur d\'initialisation du SDK Facebook:', err));
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const loginSubscr = this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe((user: UserModel | undefined) => {
        if (user) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  // loginWithFacebook() { 
  //   this.Authfb.login()
  //     .then((authResponse: any) => {
  //       console.log('Connexion réussie avec Facebook:', authResponse);
  //     })
  //     .catch((err) => console.error('Erreur de connexion Facebook:', err));
  // }
  loginWithGoogle(): void {
    this.authsergo
      .signInWithGoogle()
      .then((user: SocialUser) => {
        console.log('Connexion réussie avec Google:', user);
        this.user = user;
      })
      .catch((error) => {
        console.error('Erreur de connexion avec Google:', error);
      });
  }
  
}