import { Store } from "@ngrx/store";
import { Component, OnInit } from '@angular/core';
import { SearchAction } from '../../actions/restaurant';
import { FormGroup, FormControl } from "@angular/forms";
import * as fromRoot from '../../reducers/index';
import * as search from '../../actions/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery = '';

  searchForm = new FormGroup ({
    search: new FormControl(this.searchQuery)
  });
  
  constructor(private _store: Store<fromRoot.State>) { 

    _store.select(fromRoot.getCurrentSearchQuery)
      .subscribe(query => {
        const searchField = this.searchForm.controls['search'];
        if (query != searchField.value) {
          searchField.setValue(query);
        }
      });

    this.searchForm.valueChanges
      .subscribe(data => this.onChange(data));
  }

  ngOnInit() {
    this.search('');
  }

  search (location: string) {
    this._store.dispatch(new SearchAction(location));
  }

  onSubmit() {
    this.search(this.searchForm.get('search').value);
  }

  onChange (data: any) {
    this._store.dispatch(new search.SetSearhQueryAction(this.searchForm.controls['search'].value))
  }

}
