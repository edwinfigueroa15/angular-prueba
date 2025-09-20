import { Injectable, inject } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { environment } from '@environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private router = inject(Router);

  // ---------------------------------------------- ::
  // FUNCTIONS
  isNumber(value: any) {
    const regex = /^[0-9]*$/;
    return regex.test(value);
  }

  isEmail(email: string ) {
    const emailRegExp = new RegExp( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,13}$/ );  
    return emailRegExp.test(email.trim());
  };

  removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC');
  }

  // ---------------------------------------------- ::
  // ROUTER
  routerLink(url: string, extras?: NavigationBehaviorOptions) {
    return this.router.navigateByUrl(url, extras);
  }

  // ---------------------------------------------- ::
  // LOCAL STORAGE
  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  setLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  // ---------------------------------------------- ::
  // FORMS

  addValidator(control: AbstractControl, validator: ValidatorFn | ValidatorFn[]) {
    control.addValidators(validator);
    control.updateValueAndValidity();
  }

  removeValidator(control: AbstractControl, validator: ValidatorFn | ValidatorFn[]) {
    control.removeValidators(validator);
    control.updateValueAndValidity();
  }

  // ---------------------------------------------- ::
  // ENCRYPT
  encrypt(textToEncrypt : string): string {
    try {
      return CryptoJS.AES.encrypt(textToEncrypt, environment.SECRET_KEY.trim()).toString();
    } catch (error) {
      return '';
    }
  }

  decrypt(textToDecrypt : string): string {
    try {
      return CryptoJS.AES.decrypt(textToDecrypt, environment.SECRET_KEY.trim()).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return '';
    }
  }

  generateId(): string {
    const timestamp = new Date().getTime().toString();
    const random = Math.random().toString();
    return CryptoJS.SHA256(timestamp + random).toString().substring(0, 16); // corta a 16 chars
  }
}
