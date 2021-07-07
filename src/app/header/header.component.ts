import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

/*  get isLoggedIn(): boolean {
    console.log('> isLoggedIn');
    const res = this.authService.isLoggedIn;
    console.log('< isLoggedIn ' + res);
    return res;
  }*/
/*  get currentUser(): string {
    return this.authService.userName;
  }*/

  get user(): Observable<firebase.User | null> {
    return this.authService.user;
  }

  ngOnInit(): void {
  }

  signOut(): void {
    this.authService.signOut().then((_) => {
      this.router.navigate(['sign-in']).then(() => {});
    });
  }
}
