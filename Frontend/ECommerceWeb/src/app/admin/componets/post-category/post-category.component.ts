import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  categoryForm!: FormGroup

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name : [null, [Validators.required]],
      description : [null, [Validators.required]]
    })
  }

  addCategory(): void {
    if(this.categoryForm.valid){
      this.adminService.addCategory(this.categoryForm.value).subscribe((res) =>{
        if(res.id != null){
          this.snackBar.open('Category Posted Successfully', 'Close', {duration: 5000});
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open(res.message, 'Close', {duration: 5000, panelClass: 'error-snackbar'});
        }
      })
    }else{
      this.categoryForm.markAllAsTouched();
    }
  }

}
