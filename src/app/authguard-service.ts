import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private auth:AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.auth.isAuthenticated());
    return this.auth.isAuthenticated();
  }
}
