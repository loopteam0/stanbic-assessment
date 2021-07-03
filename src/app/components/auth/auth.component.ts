import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private service: Service, private router: Router, private snackbar: MatSnackBar) { }
  signInEmail!: string;
  signInPassword!: string;
  signUpEmail!: string;
  signUpPassword!: string;
  loading = false;

  signIn() {
    this.loading = true;
    if (this.signInEmail != null && this.signInPassword != null) {

      this.service.signin({
        email: this.signInEmail, password: this.signInPassword
      }).then(_ => {
        this.router.navigate(['/students'])
      }).catch(e => {
        this.openSnackBar(e);
      }).finally(() => {
        this.loading = false;
      })
    }
  }

  signUp() {
    this.loading = true;
    if (this.signUpEmail != null && this.signUpPassword != null) {

      this.service.signUp({
        email: this.signInEmail, password: this.signInPassword
      }).then(_ => {
        this.router.navigate(['/students'])
      }).catch(e => {
        this.openSnackBar(e);
      }).finally(() => {
        this.loading = false;
      })
    }
  }

  openSnackBar(msg: string) {
    this.snackbar.open(msg, 'OK', {
      duration: 3000
    });
  }

  ngOnInit(): void {
  }

}
