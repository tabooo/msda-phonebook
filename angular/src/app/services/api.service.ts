import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams, HttpModule} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class ApiService {

  private url = 'http://localhost:8083/restapi';

  private requestOptions: RequestOptions = null;

  private headers: Headers = null;

  private searchParams: URLSearchParams = null;

  public authUser;

  constructor(private http: Http) {
    this.refresh({});
  }

  get(url: string, params: any): Observable<any> {
    this.refresh(params);
    return this.http.get(this.url + url, this.requestOptions).map(this.extractData).catch(this.handleError);
  }

  post(url: string, params: any, body: any): Observable<any> {
    this.refresh(params);
    return this.http.post(this.url + url, body, this.requestOptions).map(this.extractData).catch(this.handleError);
  }

  openWindow(url: string, params: any) {
    let requestParams = new HttpParams();
    for (let key in params) {
      requestParams = requestParams.append(key, params[key]);
    }
    console.log(requestParams)
    window.open(this.url + url + '?' + requestParams.toString());
  }

  refresh(params) {
    this.headers = new Headers();
    this.searchParams = new URLSearchParams();

    this.headers.append('Content-Type', 'application/json');

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        this.searchParams.set(key, encodeURIComponent(params[key]));
      }
    }

    this.requestOptions = new RequestOptions({
      headers: this.headers,
      search: this.searchParams,
      withCredentials: true
    });
  }

  public HasPermissions(permissions): Boolean {
    if (this.authUser && this.authUser.added.rights) {
      for (let j = 0; j < permissions.length; j++) {
        if (this.authUser.added.rights.indexOf(permissions[j]) !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  private extractData(res: Response) {
    return res;
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error.status === 401) {
      this.authUser = null;
    }
    return Observable.throw(errMsg);
  }

  public getUrl() {
    return this.url;
  }
}
