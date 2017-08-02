import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';
import { async } from "@angular/core/testing";

describe('Search Component', () => {

    let fixture: ComponentFixture<SearchComponent>;
    let comp: SearchComponent;
    let de: DebugElement;
    let el: HTMLElement;
    
    beforeEach(async(() => {
        // asynchronously load the component's template and CSS
        TestBed.configureTestingModule({
            declarations: [ SearchComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {

        // create the component after its externals are available

        fixture = TestBed.createComponent(SearchComponent);
        comp = fixture.componentInstance;
        // de = fixture.debugElement;
        // el = 
    });


})