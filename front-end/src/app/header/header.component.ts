import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { UserAuthService } from '../_bs-services/user-auth.service';
import { UserService } from '../_bs-services/user.service';
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    NgIf,
    RouterLink,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

}
