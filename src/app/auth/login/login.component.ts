import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public title = 'Please sign in!';

  public loginForm: FormGroup;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  private loadForm(): void {

    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

  }

  onSubmit(): void {

    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      swal.fire('Login failed', 'Please type in your username and password', 'error');
    } else {
      this.store.dispatch(new AuthActions.AuthenticateStart(this.loginForm.value));
    }

  }

}
