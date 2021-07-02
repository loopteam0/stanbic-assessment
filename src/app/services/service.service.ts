import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:3000';

  async signin(data: any) {
    try {

      const res = await this.http.get(this.baseUrl + '/auth').toPromise()
      this.isLoggedIn = true;
      return res;
    } catch (error) {
      return error;
    }
  }

  async signUp(data: any) {
    try {

      const res = await this.http.post(this.baseUrl + '/auth', {
        data: data,
      }).toPromise()

      this.isLoggedIn = true;
      return res;
    } catch (error) {
      return error;
    }
  }

  async getStudents() {
    try {

      const res = await this.http.get(this.baseUrl + '/students').toPromise()
      return res;
    } catch (error) {
      return error;
    }
  }



  signOut() {
    this.isLoggedIn = false;
  }
}
