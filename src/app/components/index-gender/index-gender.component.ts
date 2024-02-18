import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { GenderService } from '../../services/gender/gender.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-index-gender',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index-gender.component.html',
})
export class IndexGenderComponent implements OnInit {
  public route = inject(ActivatedRoute);
  public genderService: GenderService = inject(GenderService);
  public getGenderList = this.genderService.genderList;
  public page: WritableSignal<string | null> = signal<string | null>('1');
  public modal: WritableSignal<boolean> = signal<boolean>(false);
  public idModal: WritableSignal<number> = signal<number>(0);

  public ngOnInit(): void {
    this.callBackList(this.page());
  }

  public callBackList(page: string | null): void {
    this.genderService.httpGenderList$(page)
      .subscribe();
  }

  public checkLink(pageText: string): boolean {
    if (pageText.includes('Next') || pageText.includes('Previous')) {
      return false
    }

    return true;
  }

  public toggleDeleteModal(id?: number)
  {
    if (id) {
      this.idModal.set(id);
    }
    this.modal.set(!this.modal());
  }

  public deleteGender(id: number): void {
    this.genderService
      .httpGenderDelete$(id)
      .pipe(concatMap(() => this.genderService.httpGenderList$(this.page())))
      .subscribe()

    this.toggleDeleteModal();
  }
}
