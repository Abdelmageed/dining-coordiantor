import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from './reducers/index';
import { Observable } from "rxjs/Observable";
import { MockBackendService } from "./services/mock-backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: Observable<string>;
  
  constructor (private _store: Store<fromRoot.State>, private backend: MockBackendService) {
    this.username = _store.select(fromRoot.getUserName);
  }



}
