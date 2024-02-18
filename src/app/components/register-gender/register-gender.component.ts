import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenderService } from '../../services/gender/gender.service';
import { concatMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-gender',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-gender.component.html',
})
export class RegisterGenderComponent {
  public router: Router = inject(Router);
  public genderService: GenderService = inject(GenderService);
  public name: WritableSignal<string> = signal<string>('');
  public color: WritableSignal<string> = signal<string>('');

  public registerGender(): void {
    this.genderService
      .httpGenderRegister$(this.name(), this.color())
      .pipe(concatMap(() => this.genderService.httpGenderList$(null)))
      .subscribe();

    this.router.navigate(['/gender']);
  }
}