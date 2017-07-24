import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { Restaurant } from "../../models/restaurant";
import { RestaurantService } from "../../services/restaurant.service";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantListComponent implements OnInit {

  @Input() restaurants: Restaurant[];
  @Output() addGoing = new EventEmitter<string>();
  @Output() removeGoing = new EventEmitter<string>();
  
  constructor(private restaurantService: RestaurantService) { 
   
  }

  ngOnInit() {
   
  }

}
