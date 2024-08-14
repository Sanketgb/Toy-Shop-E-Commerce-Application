import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, 
    private snackBar: MatSnackBar, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(20), this.validateNameFormat]],
      email: [null, [Validators.required, this.emailValidator]],
      password: [null, [Validators.required, Validators.minLength(8), this.validatePasswordFormat]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  
    if (control.value && !emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  validateNameFormat(control: AbstractControl): ValidationErrors | null {
    const validPattern = /^[A-Z][a-zA-Z ]*$/; 
    if (!validPattern.test(control.value)) {
      return { invalidName: true };
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
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.snackBar.open('Passwords does not match. Please confirm the password.', 'Close', { duration: 5000, panelClass: ['error-snackbar']});
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('Sign up successfull.', 'Close', {duration: 5000});
        this.router.navigateByUrl("/login");
      },
      (error) => {
        this.snackBar.open('Sign up failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar'});
      }
    )
  }
}
