import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
<<<<<<< HEAD:OpenPass.IdController.UI/projects/open-pass/src/app/guards/authenticated.guard.ts
    if (!!this.authService.uid2Token && this.authService.isEmailUsed) {
=======
    if (this.authService.isAuthenticated && this.authService.isEmailUsed) {
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/open-pass/src/app/guards/authenticated.guard.ts
      return true;
    } else {
      this.router.navigate(['auth'], { queryParamsHandling: 'preserve' });
      return false;
    }
  }
}
