import {Component, OnInit} from '@angular/core';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  authenticated: boolean;

  constructor(public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionService.getUserUpdated()
      .subscribe((res) => {
        console.log(res);
        if (res != null) {
          this.authenticated = true;
          console.log(this.authenticated);
        } else if (res === null) {
          this.authenticated = false;
          console.log(this.authenticated);
        }

      });
  }

  logout() {
    this.sessionService.logout();
  }

}
