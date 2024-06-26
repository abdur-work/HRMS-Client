import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserContextService } from './user-context.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpclient: HttpClient, private contextService: UserContextService) { }
  //Simple get with dynamic response
  public get(_url: string) {
    return this.httpclient.get<any>(_url);
  }
   //Simple get with token
   public postwithToken(_url: string, param: any,options?:any) {
    let token = this.contextService.user$._value.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    if(options){
      Object.assign(httpOptions,options)
    }
    return this.httpclient.post<any>(_url,param, httpOptions);
  }
 //Simple get with token
 public  (_url: string, param: any) {
  let token = this.contextService.user$._value.token;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
  };
  return this.httpclient.post<any>(_url,param, httpOptions);
}

  //Simple get with model response
  public get_model(_url: string): Observable<any> {
    return this.httpclient.get<any>(_url);
  }

  //Get with input param & model response
  public get_post_model(_url: string, param: any): Observable<any> {
    return this.httpclient.get<any>(_url, param);
  }

  public fetchData(_url: string, param: any) {
    return this.httpclient.post<any>(_url, param).toPromise();
  }

  //Simple post encoded with dynamic response
  public post_encoded(_url: string, param: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = { headers: headers };
    return this.httpclient.post<any>(_url, param, options);
  }

  //Simple post with dynamic response
  public post(_url: string, param: any) {
    return this.httpclient.post(_url, param);
  }

  //simple post with header
  public postWithHeader(_url: string, param: any, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.httpclient.post(_url, param, httpOptions);
  }

  //Simple post with dynamic response
  public put(_url: string, param: any) {
    return this.httpclient.put<any>(_url, param);
  }

  public EncryptTo64(model:any) {
    return btoa(model);
  }

  //Simple post with dynamic response
  public postwithresponse(_url: string, param: any) {
    return this.httpclient.post<any>(_url, param, { responseType: 'blob' as 'json' });
  }
}
