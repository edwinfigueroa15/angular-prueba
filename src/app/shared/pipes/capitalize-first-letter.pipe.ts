import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter',
  standalone: true,
  pure: true,
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

  transform(value: any): string {
    try {
      return value.slice(0, 1).toUpperCase()+value.slice(1).toLowerCase();
    } catch (error) {
      return value;
    }
  }

}
