import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { User } from '@models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { PasswordFormComponent } from './password-form/password-form.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordFormComponent,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    NgIf,
    IconComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  submitted = false;
  hide = true;

  userInfoAvailable = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private tagService: TagService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['123456', [Validators.required, Validators.min(8)]]
      },
      {
        updateOn: 'submit'
      }
    );
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.userInfoAvailable = !!user;
  }

  formSubmitted(): void {
    if (this.loginForm.valid) {
      this.submitted = true;

      const { email, password } = this.loginForm.controls;

      this.authService
        .login(email.value!, password.value!)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.submitted = false;
            email.setErrors({
              emailNotFound: true
            });
            this.cdr.markForCheck();
            return EMPTY;
          })
        )
        .subscribe(async (user: User) => {
          this.submitted = false;
          await this.router.navigate([this.authService.redirectUrl]);
          //this.saveFavoriteTagsToLocaleStorage();
        });
    }
  }

  /**
   * Save favorite tags to local storage
   */
  saveFavoriteTagsToLocaleStorage() {
    /*this.tagService.getFavoriteTags().subscribe((value2) => {
      value2 && localStorage.setItem('watchedTags', JSON.stringify(value2));
    });*/
  }
}
