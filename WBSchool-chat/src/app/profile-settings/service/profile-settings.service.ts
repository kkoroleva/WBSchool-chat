import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  private url = "http://www.wbschool-chat.ru/"

  constructor(private http: HttpClient) { }

  editProfileSettings(formData: any) {
    return this.http.patch(this.url, formData)
    .pipe(
      catchError(error => {
        console.log("Error: ", error);
        return throwError(() => error);
      })
    )
  }
}
