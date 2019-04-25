import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const heroku = 'http://localhost:5000';

const httpOptions = {
  headers: new HttpHeaders(),
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private httpClient: HttpClient) { }

  public findUserById(uid){
    return this.httpClient.post(heroku + '/api/user/' + uid, httpOptions);
  }

  public findCurrentUser() {
    return this.httpClient.post(heroku + '/api/currentUser', httpOptions,httpOptions);
  }

  public login(user) {
    return this.httpClient.post(heroku + '/api/login', user, httpOptions);
  }

  public register(user) {
    return this.httpClient.post(heroku + '/api/register', user, httpOptions);
  }

  public updateUser(userId, user) {
    return this.httpClient.put(heroku + '/api/user/' + userId, user, httpOptions);
  }

  public logout() {
    return this.httpClient.post(heroku + '/api/logout', {responseType: 'text'}, httpOptions);
  }
  public createProduct(product) {
    return this.httpClient.post(heroku + '/api/newproduct', product, httpOptions);
  }

  public findAllProducts() {
    return this.httpClient.post(heroku + '/api/product', httpOptions);
  }


}