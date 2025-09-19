import { AngularModule } from '@app/shared/modules';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { UserStoreService } from '@app/core/services/user-store.service';
import { UtilsService } from '@app/shared/utils/utils.service';
import { InputText } from '@app/shared/components/inputs/input-text/input-text';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-sign-in',
  imports: [AngularModule, InputText, ButtonModule, InputTextModule, Toast],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
  providers: [MessageService]
})
export class SignIn {
  private _authService = inject(AuthService);
  private _messageService = inject(MessageService);
  private _userStoreService = inject(UserStoreService);
  private _utilsService = inject(UtilsService);

  isLoading = signal(false);
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  errors = {
    username: {
      required: { message: 'El usuario es requerido' }
    },
    password: {
      required: { message: 'La contraseña es requerida' },
    }
  }

  forgotPassword() {
    this._utilsService.routerLink('/auth/password-change');
  }

  onSubmit() {
    if (this.form.invalid || this.isLoading()) return;
    this.isLoading.set(true);

    this._authService.signIn(this.form.value as any).subscribe({
      next: (user) => {
        if (!user) {
          this.isLoading.set(false);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Se produjo un error al iniciar sesión', life: 300000000 });
          return;
        }

        localStorage.setItem('currentUser', this._utilsService.encrypt(JSON.stringify(user)));
        this.isLoading.set(false);
        this._utilsService.routerLink('/dashboard');
      },
      error: (error) => {
        console.log(error);
        this.isLoading.set(false);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Se produjo un error al iniciar sesión', life: 3000 });
      }
    });
  }
}
