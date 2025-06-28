import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RecaptchaModule, RecaptchaComponent } from 'ng-recaptcha-2';
import { environment } from '../../../../../environments/environment';
import { Auth } from '../../../../services/auth/auth';
import { LoginRequest } from '../../../../services/auth/auth.model';
import { ValidationError } from '../../../../services/auth/auth.model';
import { lowerFirst } from '../../../../shared/utils/string.utils';

declare const grecaptcha: any;
declare global {
  interface Window {
    recaptchaCallback?: (token: string) => void;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, RecaptchaModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef;

  captchaToken: string | null = null;
  widgetId: number | null = null;
  recaptchaKey = environment.recaptchaKey;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const waitForGrecaptcha = () => {
        if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
          
          window.recaptchaCallback = (token: string) => {
            this.captchaToken = token;
            console.log('Token do reCAPTCHA:', token);
          };
          
          this.widgetId = grecaptcha.render(this.recaptchaContainer.nativeElement, {
            sitekey: this.recaptchaKey,
            callback: 'recaptchaCallback'
          });
        } else {
          setTimeout(waitForGrecaptcha, 100);
        }
      };
      waitForGrecaptcha();
    }
  }

  loginForm: FormGroup;
  loginError: string | null = null;
  loginRecaptcha: string | null = null;
  fieldErrors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: Auth
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  getEmailError(): string {
    const email = this.loginForm.get('email');
    if (email?.hasError('required')) return 'O e-mail é obrigatório.';
    if (email?.hasError('email')) return 'Formato de e-mail inválido.';
    if (email?.hasError('api')) return email.getError('api');
    return '';
  }

  getSenhaError(): string {
    const control = this.loginForm.get('senha');
    if (control?.hasError('required')) return 'A senha é obrigatória.';
    if (control?.hasError('api')) return control.getError('api');
    return '';
  }

  onSubmit(): void {
    this.loginRecaptcha = null;
    
    // if (!this.captchaToken) {
    //   this.loginRecaptcha = 'Por favor, complete o reCAPTCHA';
    //   return;
    // }
    
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      senha: this.loginForm.value.senha,
      recaptchaToken: this.captchaToken!
    };

    this.loginError = null;
    this.fieldErrors = {};

    console.log('captchaToken', this.captchaToken);

    this.auth.login(loginRequest).subscribe({
      next: (result) => {
        // Sucesso: result é LoginResponse
        // this.router.navigate(['/dashboard']);
        console.log(result);
      },
      error: (errors: ValidationError[]) => {
        errors.forEach(err => {
          const field = lowerFirst(err.campo);
          const control = this.loginForm.get(field);
          if (control) {
            control.setErrors({ api: err.mensagem });
            control.markAsTouched();
          } else {
            this.loginError = err.mensagem;
          }
        });
      }
    });
  }
}
