import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from "@angular/http";
import { StoreModule } from "@ngrx/store";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { RestaurantsComponent } from './containers/restaurant-list/restaurants.component';
import { RestaurantListComponent } from "./components/restaurant-list/restaurant-list.component";

import { RestaurantService } from "./services/restaurant.service";
// import { InMemoryWebApiModule } from "angular-in-memory-web-api";
// import { RestaurantInMemoryService } from "./services/restaurant-in-memory.service";

import { reducers, initialState} from './reducers/index';

import { EffectsModule } from "@ngrx/effects";
import { RestaurantEffects } from "./effects/restaurant";

import { httpFactory } from './httpFactory';
import { MockBackendService } from "./services/mock-backend.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RestaurantsComponent,
    RestaurantListComponent
  ],
  imports: [
    BrowserModule,
    
    // InMemoryWebApiModule.forRoot(RestaurantInMemoryService),
    StoreModule.forRoot(reducers, {initialState}),
    EffectsModule.forRoot([RestaurantEffects]),
    NgbModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: httpFactory
    },
    MockBackendService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
