import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PixabayService {
  private apiKey = '5832566-81dc7429a63c86e3b707d0429';
  private apiUrl = 'https://pixabay.com/api/';

  constructor(private http: HttpClient) {}

  getImages(query: string = '', page: number = 1, perPage: number = 10): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${query}&per_page=${perPage}&page=${page}`;
    return this.http.get(url);
  }
  getImageById(id: number): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&id=${id}`;
    return this.http.get(url);
  }
  
  

}
