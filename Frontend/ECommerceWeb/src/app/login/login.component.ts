import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : [null, [Validators.required, this.emailValidator]],
      password : [null, [Validators.required, Validators.minLength(8), this.validatePasswordFormat]]
    })
  }

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  
    if (control.value && !emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  validatePasswordFormat(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    const upperCaseLetters = /[A-Z]/;
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    const numbers = /[0-9]/;

    if (
      !upperCaseLetters.test(password) ||
      !specialCharacters.test(password) ||
      !numbers.test(password)
    ) {
      return { invalidPassword: true };
    }
    return null;
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe(
      (res) => {
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('customer/dashboard');
        }
      },
      (error) => {
        this.snackBar.open('Bad credentials', 'ERROR', { duration: 5000});
      }
    )
  }
}
