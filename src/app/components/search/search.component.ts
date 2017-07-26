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

  searchQuery = '';
  searchedOnLoad = false;

  searchForm = new FormGroup ({
    search: new FormControl(this.searchQuery)
  })
  
  constructor(private _store: Store<fromRoot.State>) { 
    _store.select(fromRoot.getUserSearchQuery)
      .subscribe(q => {
        if (this.searchQuery != q && !this.searchedOnLoad) {
          this.search(q);
          this.searchForm.controls['search'].setValue(q);
        }
        this.searchQuery = q;
      })
  }

  ngOnInit() {
  }

  search (location: string) {
    this.searchedOnLoad = true;
    this._store.dispatch(new SearchAction(location));
  }

  onSubmit() {
    this.search(this.searchForm.get('search').value);
  }

}
