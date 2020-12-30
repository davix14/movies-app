import {Component, OnInit} from '@angular/core';
import {SessionService} from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movies-app';

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionService.autoAuthUser();
  }
}
