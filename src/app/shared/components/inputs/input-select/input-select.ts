import { Component, Input, output, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularModule } from '@app/shared/modules';

// PrimeNG
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-input-select',
  imports: [AngularModule, SelectModule, InputIconModule],
  templateUrl: './input-select.html',
  styleUrl: './input-select.scss'
})
export class InputSelect {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) options: any[] = [];
  @Input() optionLabel = '';
  @Input() optionValue = '';
  @Input() optionImg = '';
  @Input() filter = false;
  @Input() filterBy = '';
  @Input() placeholder = '';

  onChange = output<any>();

  onChangeEvent(event: any) {
    this.onChange.emit(event);
  }
}
