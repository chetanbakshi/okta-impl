import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as RootStore from '../../core/store';
import * as AuthActions from '../../core/store/actions/auth.actions';
import { Subscription, Subscriber } from 'rxjs';
import { Login } from 'src/app/core/models/login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  checkAuthSubs: Subscription;

  returnUrl: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<RootStore.State>) {
    
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/admin';
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
    this.checkAuthenticated()
  }

  checkAuthenticated() { 
    this.checkAuthSubs = this.store.select(RootStore.checkAuthenticated).subscribe(
      (isAuth: boolean) => {        
        if (isAuth) {          
          this.router.navigate(['/admin']);
        } 
        if (isAuth != undefined && isAuth === false) { 
          this.router.navigate(['/login']); 
        } 
      }
    )
  }

  onSubmit(): void {
    const loginDetails: Login = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    this.store.dispatch(AuthActions.loadLogin(loginDetails))
  }

  ngOnDestroy(): void {
   this.checkAuthSubs.unsubscribe();
  } 

}
