import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';

function passwordMatcher(pwGrp: AbstractControl): ValidationErrors | null {
  const passwd = pwGrp.get('password');
  const confpasswd = pwGrp.get('confirmPassword');
  return passwd.value ===
    confpasswd.value ? null : {mismatch: true};
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    pwGroup: this.builder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: [passwordMatcher] })
  });

  get email(): AbstractControl {return this.signupForm.get('email'); }
  get name(): AbstractControl {return this.signupForm.get('name'); }
  get password(): AbstractControl {return this.signupForm.get('pwGroup').get('password'); }
  get confirmPassword(): AbstractControl {return this.signupForm.get('pwGroup').get('confirmPassword'); }
  get pwGroup(): AbstractControl {return this.signupForm.get('pwGroup'); }

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    this.authService.signUp(this.email.value, this.password.value, this.name.value)
      .then((_) => {
        this.router.navigate(['address-list']).then(() => {});
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  googleSignIn(): void {
    this.authService.googleAuth()
      .then((_) => {
        this.router.navigate(['address-list']).then(() => {});
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
