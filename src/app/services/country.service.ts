import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryData } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private http: HttpClient) { }

  getCountryData(countryCode: string): Observable<CountryData> {
    return this.http.get<CountryData>(`assets/data/${countryCode}.json`);
  }
  
  getAllCountries(): Observable<{code: string, name: string}[]> {
    return this.http.get<{code: string, name: string}[]>('assets/data/countries.json');
  }
} 