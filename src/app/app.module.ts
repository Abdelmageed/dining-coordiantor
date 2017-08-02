import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from "@angular/http";
import { StoreModule } from "@ngrx/store";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { RestaurantsComponent } from './containers/restaurant-list/restaurants.component';
import { RestaurantListComponent } from "./components/restaurant-list/restaurant-list.component";
import { SigninComponent } from "./components/signin/signin.component";

import { RestaurantService } from "./services/restaurant.service";
import { UserService } from "./services/user.service";

import { reducers, initialState} from './reducers/index';

import { EffectsModule } from "@ngrx/effects";
import { RestaurantEffects } from "./effects/restaurant";
import { UserEffects } from "./effects/user";

import { httpFactory } from './httpFactory';
import { MockBackendService } from "./services/mock-backend.service";
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RestaurantsComponent,
    RestaurantListComponent,
    SigninComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    
    // InMemoryWebApiModule.forRoot(RestaurantInMemoryService),
    StoreModule.forRoot(reducers, {initialState}),
    EffectsModule.forRoot([RestaurantEffects, UserEffects]),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
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
    RestaurantService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
