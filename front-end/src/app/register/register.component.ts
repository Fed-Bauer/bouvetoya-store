import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_bs-services/user.service';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    FormsModule,
    MatHint,
    MatInput,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register({registerData: registerForm.value}).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
