import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootStore from '../store';
import { switchMap, map, take } from 'rxjs/operators';

import * as AuthActions from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuardService implements CanActivate {
export class AuthGuardService implements CanLoad, CanActivate {
  returnUrl
  constructor(
    public authService: AuthService,
    public router: Router,
    private store: Store<RootStore.State>
  ) {

  }

  canActivate(): Observable<boolean> {

    return this.store.select(RootStore.checkAuthenticated).pipe(
      take(1),
      switchMap(
        (res: boolean) => {
          if (res) {
            return of(true);
          } 
           if (res != undefined && res === false) {
            this.router.navigate(['/login']);
            return of(false);
          }
        }
      )
    )
  }
  canLoad(): Observable<boolean> {
    return this.store.select(RootStore.checkAuthenticated)
      .pipe(
        take(1),
        switchMap(
          (res: boolean) => {
            if (res) {
              return of(true);
            } 
             if (res != undefined && res === false) {
              this.router.navigate(['/login']);
              return of(false);
            }

          }

        )
      )
  }









  // async canActivate() {
  //   if (!await this.authService.checkAuthenticated()) {
  //     await this.router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }
}
