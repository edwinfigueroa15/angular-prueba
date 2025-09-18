import { AbstractControl, ValidationErrors } from '@angular/forms';

export const EmailValidator = (_control: AbstractControl): ValidationErrors | null => {
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(_control.value);
  return isValid ? null : { invalidEmail: true };
}