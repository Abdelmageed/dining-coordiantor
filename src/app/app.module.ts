import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { StoreModule } from "@ngrx/store";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { RestaurantService } from "./services/restaurant.service";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { RestaurantInMemoryService } from "./services/restaurant-in-memory.service";

import { reducers, initialState} from './reducers/index';

import { EffectsModule } from "@ngrx/effects";
import { RestaurantEffects } from "./effects/restaurant";
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(RestaurantInMemoryService),
    StoreModule.forRoot(reducers, {initialState}),
    EffectsModule.forRoot([RestaurantEffects]),
    NgbModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
