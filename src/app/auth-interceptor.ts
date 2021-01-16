import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('Anonymous') !== null) {
      const newHeaders = req.headers.delete('Anonymous');
      const newRequest = req.clone({headers: newHeaders});
      return next.handle(newRequest);
    } else {
      let authToken;
      this.sessionService.getTokenUpdated().subscribe((token: string) => {
        authToken = token;
      });
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      return next.handle(authRequest);
    }
  }
}
