import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/exchange-rates/getExchangeRates';

  constructor(private http: HttpClient) { }

  getExchangeRates(date: string): Observable<any> {
    const url = `${this.apiUrl}/${date}`;
    return this.http.get<any>(url);
  }
}
