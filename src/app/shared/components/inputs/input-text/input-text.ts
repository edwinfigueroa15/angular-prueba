import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularModule } from '@app/shared/modules';
import { UtilsService } from '@app/shared/utils/utils.service';

// PrimeNG
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-input-text',
  imports: [AngularModule, IconFieldModule, InputIconModule, InputTextModule, MessageModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.scss'
})
export class InputText {
  nameError: string = '';
  isTypePassword: boolean = false;
  showPassword = signal<boolean>(false);

  // Props Icons
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconClass: string = '';

  // Props Input
  @Input({ required: true }) control!: FormControl;
  @Input() label!: string;
  @Input() sublabel: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() inputClass: string = '';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'false';
  @Input() autofocus: boolean = false;
  @Input() errors: any = {};

  @Output() onChange: EventEmitter<Event> = new EventEmitter();

  private _utilsService = inject(UtilsService); 
  constructor() { }
  ngOnInit() {
    if(this.type === "password") this.isTypePassword = true;
  }

  validators(event: any) {
    if (this.type === "number") return this._utilsService.isNumber(event.key);
    return true;
  }

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }

  changeVisibilityPassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.showPassword.update(value => !value)
  }

  onChangeEvent(event: any) {
    this.onChange.emit(event);
  }
}
