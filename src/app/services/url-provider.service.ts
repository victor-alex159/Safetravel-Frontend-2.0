import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {

  public url: string = 'http://localhost:8085'; // local
  // public url: string = 'https://safetravelpe.herokuapp.com'; // Heroku
  
  constructor() { }
}
