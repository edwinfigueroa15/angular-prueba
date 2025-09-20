import { Component, inject, signal } from '@angular/core';
import { AngularModule } from '@app/shared/modules';
import { UserStoreService } from '@app/core/services/user-store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputText } from '@app/shared/components/inputs/input-text/input-text';
import { EmailValidator } from '@app/shared/validators/email.validator';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { User } from '@app/core/interfaces/db.mocks.interface';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-profile',
  imports: [AngularModule, ToastModule, ConfirmDialog, InputText, ButtonModule, RadioButtonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  providers: [ConfirmationService, MessageService,]
})
export class Profile {
  private _confirmationService = inject(ConfirmationService);
  private _messageService = inject(MessageService);
  private _userService = inject(UserService);
  private _userStoreService = inject(UserStoreService);

  user = { ...this._userStoreService.user() };
  users: User[] = [];
  isLoading = signal(false);
  form = new FormGroup({
    name: new FormControl(this.user?.name, [Validators.required]),
    username: new FormControl(this.user?.username, [Validators.required]),
    email: new FormControl(this.user?.email, [Validators.required, EmailValidator]),
    notifications: new FormControl(this.user?.notifications, [Validators.required]),
  })

  errors = {
    name: {
      required: { message: 'El nombre es requerido' }
    },
    username: {
      required: { message: 'El usuario es requerido' }
    },
    email: {
      required: { message: 'El correo es requerido' },
      invalidEmail: { message: 'El correo es invalido' },
    },
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService.getAll().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.log(error)
    })
  }

  onUploadAvatar() {
    this.user.avatar = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 60);
  }

  onSubmit() {
    if (this.form.invalid || this.isLoading()) return;
    this.isLoading.set(true);

    const validValuesExist = this.users.find(user => {
      if(user.id === this._userStoreService.user()?.id) return false;
      return user.username === this.form.value.username || user.email === this.form.value.email;
    });
    if (validValuesExist) {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'El usuario o correo ya existe' });
      this.isLoading.set(false);
      return;
    }

    const user: User = {
      ...this._userStoreService.user()!,
      name: this.form.value.name!,
      username: this.form.value.username!,
      avatar: this.user.avatar,
      email: this.form.value.email!,
      notifications: this.form.value.notifications!,
    };

    this._userService.updateProfile(user).subscribe({
      next: () => {
        this._userStoreService.setUser(user);
        this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Perfil actualizado correctamente' });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error)
        this.isLoading.set(false);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el perfil' });
      }
    })
  }
}
