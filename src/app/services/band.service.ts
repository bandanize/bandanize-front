import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  private apiUrl = 'http://localhost:8080/api/bands';

  constructor(private http: HttpClient) {}

  getMyBands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-bands`);
  }

  getBandById(bandId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${bandId}`);
  }

  createBand(userId: number, band: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${userId}`, band);
  }

  updateBand(bandId: number, band: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bandId}`, band);
  }
}