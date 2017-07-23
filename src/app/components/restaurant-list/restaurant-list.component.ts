import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Restaurant } from "../../models/restaurant";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantListComponent implements OnInit {

  @Input() restaurants: Restaurant[];
  
  constructor() { 
   
  }

  ngOnInit() {
   
  }

}
