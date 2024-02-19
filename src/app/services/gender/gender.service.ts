import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { Observable, map, share, shareReplay, tap } from 'rxjs';
import { Gender } from '../../interfaces/genders/gender';
import { Payload } from '../../interfaces/genders/payload';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private http: HttpClient = inject(HttpClient);
  private url: string = 'http://127.0.0.1:8000/api/genders';
  public genderList: WritableSignal<Payload | null> = signal<Payload | null>(null);
  public genderItem: WritableSignal<Gender | null> = signal<Gender | null>(null);

  public httpGenderList$(page: string | null): Observable<Payload> {
    this.genderList.set(null);

    return this.http.get<Payload>(`${this.url}?page=${page}`)
      .pipe(
        shareReplay(),
        tap((response) => this.genderList.set(response))
      )
  }

  public getGenderList(): Signal<Payload | null> {
    return this.genderList.asReadonly();
  }

  public httpGenderById$(id: number): Observable<Gender> {
    return this.http.get<Gender>(`${this.url}/${id}`)
      .pipe(
        shareReplay(),
        tap((response) => this.genderItem.set(response))
      )
  }

  public getGenderItem(): Signal<Gender | null> {
    return this.genderItem.asReadonly();
  }

  public httpGenderRegister$(name: string, color: string): Observable<Gender> {
    return this.http.post<Gender>(`${this.url}/register`, {
      name, color
    })
      .pipe(
        shareReplay()
      );
  }

  public httpGenderUpdate$(id: number, name: string, color: string): Observable<Gender> {
    return this.http.patch<Gender>(`${this.url}/update`, {
      id, name, color
    })
      .pipe(
        shareReplay()
      );
  }

  public httpGenderDelete$(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/destroy/${id}`)
      .pipe(
        shareReplay()
      )
  }
}
