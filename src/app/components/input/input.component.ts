import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() error: string = '';

  @Output() inputValueChange = new EventEmitter<string>();

  onInputChange(event: any) {
    this.inputValueChange.emit(event.target.value);
  }
}
