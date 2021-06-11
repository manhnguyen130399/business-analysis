import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { KQKD } from '../models/KQKD';
import { Output } from '../models/Output';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private readonly httpClient: HttpClient) { }
  url = 'https://python-analyzer.herokuapp.com'
  private mack = new BehaviorSubject<string>("");
  currentMessage = this.mack.asObservable();
  changeMessage(message: string) { this.mack.next(message) }

  getInfoCty(id: number) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(`${this.url}/api/get-info-cty/${id}`, { responseType: 'text' }).pipe()
  }

  getKQKD(mack: string) {
    const params = new HttpParams()
      .append('type', '2')
      .append('year', '2020')
      .append('quarter', '0')
      .append('symbol', mack)
    return this.httpClient.get(`${this.url}/api/kq-kd`, { params, responseType: 'text' },).pipe()
  }

  getCDKT(mack: string) {
    const params = new HttpParams()
      .append('type', '1')
      .append('year', '2020')
      .append('quarter', '0')
      .append('symbol', mack)
    return this.httpClient.get(`${this.url}/api/cd-kt`, { params, responseType: 'text' },).pipe()
  }

  getLCTT(mack: string) {
    const params = new HttpParams()
      .append('type', '4')
      .append('year', '2020')
      .append('quarter', '0')
      .append('symbol', mack)
    return this.httpClient.get(`${this.url}/api/lc-tt`, { params, responseType: 'text' }).pipe()
  }

  get4M(mack: string) {
    const params = new HttpParams()
      .append('year', '2020')
      .append('quarter', '0')
      .append('symbol', mack)
    return this.httpClient.get<Output>(`${this.url}/api/4m`, { params }).pipe(catchError(this.handleError))

  }

  getCanslim(mack: string) {
    const params = new HttpParams()
      .append('mack', mack);
    return this.httpClient.get<Output>(`${this.url}/api/canslim`, { params }).pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      alert('Không phân tích được mã chứng khoán này')
    } else {
      alert('Không phân tích được mã chứng khoán này')
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
