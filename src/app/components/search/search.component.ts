import { Store } from "@ngrx/store";
import { Component, OnInit } from '@angular/core';
import { SearchAction } from '../../actions/restaurant';
import { FormGroup, FormControl } from "@angular/forms";
import * as fromRoot from '../../reducers/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm = new FormGroup ({
    search: new FormControl()
  })
  
  constructor(private _store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  search (location: string) {
    this._store.dispatch(new SearchAction(location));
  }

  onSubmit() {
    this.search(this.searchForm.get('search').value);
  }

}
