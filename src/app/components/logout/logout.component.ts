import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as user from '../../actions/user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  username: string;
  token: string;
  constructor(private _store: Store<fromRoot.State>) {
    _store.select(fromRoot.getUserName)
      .subscribe(name => this.username = name);

    _store.select(fromRoot.getUserToken)
      .subscribe(token => this.token = token);

  }

  ngOnInit() {
  }

  logout() {
    this._store.dispatch(new user.LogoutRequestAction(this.token));
  }

}
