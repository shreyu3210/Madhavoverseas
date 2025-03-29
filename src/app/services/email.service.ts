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
    const emailApiUrl = 'http://192.168.0.110:8000/api/email/send';
    
    return this.http.post(emailApiUrl, contactData);
  }
} 