import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, ValidationError } from './auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly baseUrl = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data).pipe(
      catchError((error) => {
        if (Array.isArray(error.error)) {
          return throwError(() => error.error as ValidationError[]);
        }
        // Caso contrário, retorna um erro genérico
        return throwError(() => [{ campo: 'senha', mensagem: 'Erro inesperado ao realizar login.' }] as ValidationError[]);
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {});
  }
}
