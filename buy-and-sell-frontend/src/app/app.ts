import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './core/components/nav-bar/nav-bar';

@Component({
  selector: 'bs-app-root',
  imports: [RouterOutlet, NavBar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private auth = inject(Auth);

  protected readonly title = signal('buy-and-sell');

  public user$ = user(this.auth);

  signIn() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOut() {
    signOut(this.auth);
  }
}
