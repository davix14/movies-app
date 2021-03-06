import {Component, OnInit} from '@angular/core';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor(public sessionService: SessionService) { //  inject sessionService to get access to methods
  }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.logout();
  }

}
