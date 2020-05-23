import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private httpOptions(data?: any) {
    return {
      headers: new HttpHeaders(
        {'Content-Type': 'application/json'}
      ),
      body: JSON.stringify(data)
    }
  }

  get(api: string, data?: any) {
    return this.http.get(api, this.httpOptions(data));
   }

  post() { }

  put() { }

  delete() { }


}
