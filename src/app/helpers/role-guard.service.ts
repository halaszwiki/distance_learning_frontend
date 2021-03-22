import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class RoleGuard implements CanActivate {
  
    constructor(private tokenStorage: TokenStorageService, private _router: Router) { }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.tokenStorage.isLoggedIn() && this.tokenStorage.isTeacher()) {
          return true;
      }
      this._router.navigate(['/home']);
      return false;
    }
  }