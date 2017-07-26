import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';

import * as user from '../../actions/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  loginError: string;
  submitDisabled: boolean;
  popover: NgbPopover;

  constructor(private _store: Store<fromRoot.State>) {
    this.signinForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    _store.select(fromRoot.getLoginError)
      .subscribe(error => {
        this.loginError = error
        if (this.popover && !this.loginError) {
          this.popover.close();
        }
      });
    
   }

  ngOnInit() {
    this.disableSubmit(true);
  }

  onValueChanged(data?: any) {

    if(!this.signinForm) { return; }

    this.disableSubmit(false);

    const form = this.signinForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = [];
      const control = form.get(field);

      if (control && control.dirty && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }

  }

  formErrors = {
    'email': [],
    'password': []
  };

  validationMessages = {
    'email': {
      'required': 'Email is required',
      'email': 'Must be a valid email'
    },
    'password': {
      'required': 'Password is required',
    }
  };

  onSubmit() {
    
    if (this.signinForm.errors) { return; }

    
    this._store.dispatch(new user.LoginRequestAction(this.signinForm.value));
  }

  disableSubmit(validate: boolean) {
    const form = this.signinForm;

    for(const field in form.controls) {
      const control = form.controls[field];
      if (validate) { control.updateValueAndValidity(); }
      if (control.errors) { 
        this.submitDisabled = true;
        return;
      }
    }
    this.submitDisabled = false;
  }

  togglePopover(popover) {
    this.popover = popover;

    this.popover.toggle();
  }


}
