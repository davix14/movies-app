import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken;
    this.sessionService.getTokenUpdated().subscribe((token: string) => {
      authToken = token;
    });
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(req);
  }

}
