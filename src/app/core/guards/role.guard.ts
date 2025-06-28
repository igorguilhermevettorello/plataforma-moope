import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const expectedRoles = route.data['expectedRoles'] as UserProfile[];
    // const userProfile = this.authService.getUserProfile();

    // if (!userProfile || !expectedRoles.includes(userProfile)) {
    //   // Redireciona para uma página de acesso negado ou para o dashboard
    //   this.router.navigate(['/dashboard']); // ou '/unauthorized'
    //   return false;
    // }
    // return true;
    return true;
  }
} 