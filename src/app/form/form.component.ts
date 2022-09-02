import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { LocalStorageModel } from '../local-storage-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  myForm: FormGroup;

  MyArray?: LocalStorageModel;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [,[Validators.minLength(7), Validators.pattern(/[0-9]{7,}/)]],
      coupon: ['', Validators.pattern(/[a-z]{1}[0-9]{3}/)],
    });
  }

  get fullName(): FormControl {
    return this.myForm.get('fullname') as FormControl;
  }

  get email(): FormControl {
    return this.myForm.get('email') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.myForm.get('phone_number') as FormControl;
  }

  get coupon(): FormControl {
    return this.myForm.get('coupon') as FormControl;
  }

  updateArray() {
    this.MyArray = {
      fullName: window.localStorage.getItem('fullname'),
      email: window.localStorage.getItem('email'),
      phoneNumber: window.localStorage.getItem('phoneNumber'),
      coupon: window.localStorage.getItem('coupon'),
    };
  }

  ngOnInit(): void {
    if (typeof Storage !== 'undefined') {
      this.fullName.setValue(localStorage.getItem('fullname'));
      this.email.setValue(localStorage.getItem('email'));
      this.phoneNumber.setValue(localStorage.getItem('phoneNumber'));
      this.coupon.setValue(localStorage.getItem('coupon'));
      this.updateArray();
    } else {
      console.log('There are no current localstorage items');
    }
  }
  invalidForm: boolean = false;
  onSubmit() {
    if (!this.myForm.valid) {
      console.log('Error in the form');
      this.invalidForm = true;
    } else {
      this.invalidForm = false;
      window.localStorage.setItem('fullname', this.fullName.value);
      window.localStorage.setItem('email', this.email.value);
      window.localStorage.setItem('phoneNumber', this.phoneNumber.value);
      window.localStorage.setItem('coupon', this.coupon.value);
      this.updateArray();
    }
  }
}
