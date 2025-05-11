import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  constructor(private http: HttpClient) { }
  
  sendEmail(contactData: any): Observable<any> {
    // Replace with your actual backend API endpoint
    const emailApiUrl = 'https://madhavoverseas.co.in/ClientSync/email/send';
    
    return this.http.post(emailApiUrl, contactData);
  }
} 