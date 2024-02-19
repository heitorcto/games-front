import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  @Input() title: string = '';
  @Input() register: boolean = false;
}
