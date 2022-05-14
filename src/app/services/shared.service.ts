import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UrlProviderService } from './url-provider.service';
import {catchError, map, retry} from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private httpHeaders = new HttpHeaders( { 'Content-Type': 'application/json'
  } );

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private urlProvider: UrlProviderService
  ) { }

  private addAtuhorizationHeader() {
    let token = this.authService.token;
    if(token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private addAtuhorizationHeaderToFile() {
    let token = this.authService.token;
    let httpHeadersToFile = new HttpHeaders();
    if(token != null) {
      return httpHeadersToFile.append('Authorization', 'Bearer ' + token);
    }
    return httpHeadersToFile;
  }

  public sendOrRecieveData(path: string, bean: any, isPublic: boolean) {
    let data = {
      data: bean
    }
    if(isPublic) {
      return this.http.post<any>(`${this.urlProvider.url + path}`, data);

    } else {
      return this.http.post<any>(`${this.urlProvider.url + path}`, data, {headers: this.addAtuhorizationHeader()});
    }
  }

  public sendDataWithFile(path: string, bean: any, nameStandar: string,  file: any): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);
    const productBlob = new Blob([JSON.stringify(bean)], { type: 'application/json' });
    formData.append(nameStandar, productBlob);
    return this.http.post(`${this.urlProvider.url + path}`, formData, {headers: this.addAtuhorizationHeaderToFile()})
    .pipe(
      map(resp => {
        let result = resp;
        return result;
      }, catchError(this.handleError))
    );
  }

  public getImageById(path: string, id: number) {
    return this.http.post<any>(`${this.urlProvider.url + path + '/' + id}`, {
      responseType: 'blob'
    });
  }

  public getFile(path: string, bean?: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if(bean != null) {
      let data = {
        data: bean
      }
      return this.http.post(`${this.urlProvider.url + path}`, JSON.stringify(data), {headers: headers, responseType:'arraybuffer'})
        .pipe(
          map(resp => {
            let result = resp;
            return result;
          }, catchError(this.handleError))
        );

    } else {
      return this.http.post(`${this.urlProvider.url + path}`, {headers: this.addAtuhorizationHeader()})
      .pipe(
        map(resp => {
          let result = resp;
          return result;
        }, catchError(this.handleError))
      );
    }
  }

  public createFile(path: string, params?: any) {
    return this.http.post(`${this.urlProvider.url + path}`, params);
  }

  private handleError(response: Response | any) {
    let errMsg: string = 'unknown exception';
    if (response instanceof Response) {
      const body: any = response.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${response.status} - ${response.statusText || ''} ${err}`;
    } else {
      if (response) {
        if (response && response.error) {
          errMsg = response.error.error;
        } else {
          errMsg = response.message ? response.message : response.toString();
        }
      }
    }
    return throwError(errMsg);
  }

}
