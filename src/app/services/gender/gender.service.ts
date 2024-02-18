import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { Gender } from '../../interfaces/genders/gender';
import { Payload } from '../../interfaces/genders/payload';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private http: HttpClient = inject(HttpClient);
  private url: string = 'http://127.0.0.1:8000/api/genders';
  public genderList: WritableSignal<Payload | null> = signal<Payload | null>(null);

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

  public httpGenderRegister$(name: string, color: string): Observable<Gender> {
    return this.http.post<Gender>(`${this.url}/register`, {
      name, color
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
