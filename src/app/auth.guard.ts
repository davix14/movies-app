import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SessionService} from './session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth;
    this.sessionService.getTokenUpdated().subscribe((token: string) => {
      isAuth = token;
    });
    if (isAuth === null) {
      this.router.navigate(['/login']);
    }

    return true;
  }

}
