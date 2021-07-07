import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {auth} from 'firebase';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  get user(): Observable<firebase.User | null> {
    return this.afAuth.user;
  }

  get isLoggedIn(): boolean {
    return this.loggedUser !== null;
  }

  get userid(): string {
    return this.loggedUser.uid;
  }

  signIn(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.loggedUser = credential.user;
      });
  }

  signUp(email: string, password: string, name: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const user = credential.user;
        this.loggedUser = credential.user; // shouldn't be null...
        if (user) {
          user.updateProfile({displayName: name}).then(_ => {});
        }
      });
  }

  passwordReset(passwordResetEmail: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  googleAuth(): Promise<void | firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((credential) => {
        this.loggedUser = credential.user;
      });
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut()
      .then((_) => {
        this.loggedUser = null;
      });
  }
}
