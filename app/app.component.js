"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/combineLatest");
require("rxjs/add/operator/filter");
var AppComponent = (function () {
    function AppComponent() {
        this.item = 'Secret Text';
        this.types = ['Private', 'Public', 'Friends Only'];
        this.importanceList = ['High', 'Medium', 'Low'];
    }
    AppComponent.prototype.onSubmit = function (formVal) {
        console.log(formVal);
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        Observable_1.Observable.combineLatest(this.form.statusChanges, this.form.valueChanges, function (status, value) { return ({ status: status, value: value }); })
            .filter(function (_a) {
            var status = _a.status;
            return status === 'VALID';
        })
            .subscribe(function (_a) {
            var value = _a.value;
            return console.table(value);
        });
        // this.form.valueChanges
        //   .subscribe(v => console.table(v));
        // this.form.statusChanges
        //     .subscribe(v => console.log(v));
    };
    __decorate([
        core_1.ViewChild('formRef'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "form", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styles: ["\n    input.ng-valid{\n      border-left: 6px solid green;\n    }\n    input.ng-invalid{\n      border-left: 6px solid red;\n    }\n    input.ng-untouched{\n      border-right: 6px solid blue;\n    }\n    input.ng-invalid + label{\n      color: red;\n    }\n  "],
            template: "\n  <form  #formRef=\"ngForm\" (ngSubmit)=\"onSubmit(formRef.value)\">\n    <fieldset ngModelGroup=\"secret\">\n      <input required type=\"text\"\n        name=\"item\"\n        placeholder=\"Item\"\n        [(ngModel)]=\"item\"\n        #itemRef=\"ngModel\"\n        minlength = \"5\"\n      >\n      <div *ngIf=\"itemRef.errors?.required\">Item is Required</div>\n      <div *ngIf=\"itemRef.valid\">Good to go!</div>\n      <div *ngIf=\"itemRef.errors?.minlength\">You need {{itemRef.errors?.minlength.requiredLength - itemRef.errors?.minlength.actualLength}} more characters</div>\n      <div *ngIf=\"itemRef.errors\">{{itemRef.errors | json}}</div>\n\n      <input\n        type=\"password\"\n        ngModel\n        name=\"password\"\n        placeholder=\"Secret Code\"\n        >\n        <div *ngFor=\"let type of types\">\n          <input\n            [id]=\"type\"\n            name=\"type\"\n            type=\"radio\"\n            ngModel\n            required\n            [value]=\"type\"\n          >\n          <label [attr.for]=\"type\">{{type}}</label>\n        </div>\n\n        <select\n          [id]=\"importance\"\n          name=\"importance\"\n          [ngModel]=\"importanceList[0]\"\n        >\n          <option\n          *ngFor=\"let importance of importanceList\"\n          [value]=\"importance\"\n          >{{importance}}</option>\n        </select>\n    </fieldset>\n    <button type=\"submit\">Submit</button>\n  </form>\n  {{formRef.value | json}} <br />\n  {{formRef.valid}}\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//ngModel = do not evaluate
//[ngModel] = no two way binding
//[(ngModel)] = two way binding
//itemRef.errors?.required means itemRef.errors could be null
//and only evaluate further if not null
//# sourceMappingURL=app.component.js.map