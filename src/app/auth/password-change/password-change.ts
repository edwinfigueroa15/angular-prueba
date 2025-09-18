import { AngularModule } from '@app/shared/modules';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputText } from '@app/shared/components/inputs/input-text/input-text';
import { UtilsService } from '@app/shared/utils/utils.service';
import { EmailValidator } from '@app/shared/validators/email.validator';

// PrimeNG
import { AuthService } from '@app/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-password-change',
  imports: [AngularModule, InputText, ButtonModule, Toast],
  templateUrl: './password-change.html',
  styleUrl: './password-change.scss',
  providers: [MessageService]
})
export class PasswordChange {
  private _authService = inject(AuthService);
  private _messageService = inject(MessageService);
  private _utilsService = inject(UtilsService);

  isLoading = signal(false);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, EmailValidator]),
  });

  errors = {
    email: {
      required: { message: 'El correo es requerido' },
      invalidEmail: { message: 'Ingrese un correo válido' },
    },
  };


  onSubmit() {
    if (this.form.invalid || this.isLoading()) return;
    this.isLoading.set(true);

    this._authService.changePassword(this.form.value.email!).subscribe({
      next: (user) => {
        if (!user) {
          this.isLoading.set(false);
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el correo' });
          return;
        }

        this._messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Se ha enviado un correo con el enlace para restablecer su contraseña',
        });
        this.form.reset();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el correo' });
      }
    });

    
  }

  goToLogin() {
    this._utilsService.routerLink('/auth/sign-in');
  }
}
