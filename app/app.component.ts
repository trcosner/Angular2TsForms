import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/filter"

@Component({
  selector: 'my-app',
  styles: [`
    input.ng-valid{
      border-left: 6px solid green;
    }
    input.ng-invalid{
      border-left: 6px solid red;
    }
    input.ng-untouched{
      border-right: 6px solid blue;
    }
    input.ng-invalid + label{
      color: red;
    }
  `],
  template: `
  <form  #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
    <fieldset ngModelGroup="secret">
      <input required type="text"
        name="item"
        placeholder="Item"
        [(ngModel)]="item"
        #itemRef="ngModel"
        minlength = "5"
      >
      <div *ngIf="itemRef.errors?.required">Item is Required</div>
      <div *ngIf="itemRef.valid">Good to go!</div>
      <div *ngIf="itemRef.errors?.minlength">You need {{itemRef.errors?.minlength.requiredLength - itemRef.errors?.minlength.actualLength}} more characters</div>
      <div *ngIf="itemRef.errors">{{itemRef.errors | json}}</div>

      <input
        type="password"
        ngModel
        name="password"
        placeholder="Secret Code"
        >
        <div *ngFor="let type of types">
          <input
            [id]="type"
            name="type"
            type="radio"
            ngModel
            required
            [value]="type"
          >
          <label [attr.for]="type">{{type}}</label>
        </div>

        <select
          [id]="importance"
          name="importance"
          [ngModel]="importanceList[0]"
        >
          <option
          *ngFor="let importance of importanceList"
          [value]="importance"
          >{{importance}}</option>
        </select>
    </fieldset>
    <button type="submit">Submit</button>
  </form>
  {{formRef.value | json}} <br />
  {{formRef.valid}}
  `
})
export class AppComponent {
  @ViewChild('formRef') form;

  item = 'Secret Text'
  types = ['Private', 'Public', 'Friends Only']
  importanceList = ['High', 'Medium', 'Low']

  onSubmit(formVal){
    console.log(formVal);
  }

  ngAfterViewInit(){
    Observable.combineLatest(
      this.form.statusChanges,
      this.form.valueChanges,
      (status, value)=> ({status, value})
    )
      .filter(({status})=> status === 'VALID')
      .subscribe(({value})=> console.table(value))
    // this.form.valueChanges
    //   .subscribe(v => console.table(v));
    // this.form.statusChanges
    //     .subscribe(v => console.log(v));
  }

}

//ngModel = do not evaluate
//[ngModel] = no two way binding
//[(ngModel)] = two way binding

//itemRef.errors?.required means itemRef.errors could be null
//and only evaluate further if not null
