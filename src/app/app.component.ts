import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from './reducers/index';
import { Observable } from "rxjs/Observable";
import { UserService } from "./services/user.service";
import { MockBackendService } from './services/mock-backend.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserAuthenticated: boolean;
  
  constructor (private _store: Store<fromRoot.State>, private userService: UserService, private backend: MockBackendService) {
    
    this._store.select(fromRoot.getUserToken)
      .switchMap(token => this.userService.isUserAuthenticated(token))
      .subscribe(isAuthenticated => this.isUserAuthenticated = isAuthenticated);

  }



}
