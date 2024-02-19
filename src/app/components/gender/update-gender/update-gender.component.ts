import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenderService } from '../../../services/gender/gender.service';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TitleComponent } from '../../title/title.component';

@Component({
  selector: 'app-update-gender',
  standalone: true,
  imports: [FormsModule, NavbarComponent, TitleComponent],
  templateUrl: './update-gender.component.html',
})
export class UpdateGenderComponent implements OnInit {
  public genderService: GenderService = inject(GenderService);
  public routeRedirect: Router = inject(Router);
  public router: ActivatedRoute = inject(ActivatedRoute);
  public getGenderItem = this.genderService.genderItem;
  public id: WritableSignal<number> = signal<number>(0);
  public name: WritableSignal<string> = signal<string>('');
  public color: WritableSignal<string> = signal<string>('');

  public ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id.set(Number(param.get('id')));

      this.genderService.httpGenderById$(this.id())
        .subscribe((response) => {
          this.name.set(response.name);
          this.color.set(response.color);
        });
    });

  }

  public updateGender() {
    this.genderService.httpGenderUpdate$(
      this.id(),
      this.name(),
      this.color()
    )
    .pipe(concatMap(() => this.genderService.httpGenderList$(null)))
    .subscribe()

    this.routeRedirect.navigate(['/gender']);
  }
}
