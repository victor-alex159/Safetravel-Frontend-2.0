import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UrlProviderService } from './url-provider.service';

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

  public sendDataWithFile(path: string, bean: any, nameStandar: string,  file: any) {
    let formData = new FormData();
    formData.append('file', file);
    const productBlob = new Blob([JSON.stringify(bean)], { type: 'application/json' });
    formData.append(nameStandar, productBlob);
    return this.http.post<any>(`${this.urlProvider.url + path}`, formData, {headers: this.addAtuhorizationHeaderToFile()});
  }

  public getImageById(path: string, id: number) {
    return this.http.post<any>(`${this.urlProvider.url + path + '/' + id}`, {
      responseType: 'blob'
    });
  }

}
