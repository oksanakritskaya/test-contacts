import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngxs/store";
import {StoreState} from "./store.state";

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth: boolean = this.store.selectSnapshot(StoreState.isLogin).isAuth;

    if (!isAuth) {
      this.router.navigate(['/login']);
    }

    return isAuth;
  }
}
