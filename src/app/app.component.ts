import { Component, EventEmitter, OnInit,Input, Output, QueryList } from "@angular/core";
import {FormGroup, FormArray} from '@angular/forms';
import {
    DynamicFormControlModel,
    DynamicInputModel,
    DynamicFormArrayModel,
    DynamicFormService
} from "@ng-dynamic-forms/core";

export const MY_FORM_MODEL: DynamicFormControlModel[] = [

  new DynamicFormArrayModel({
      id: "myFormArray",
      initialCount: 2,
    groupFactory: () => {
        return [
            new DynamicInputModel({
                id: "myInput",
                label: "My Input"
            })
        ];
    }
  })
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'libtest';formModel: DynamicFormControlModel[] = MY_FORM_MODEL;

  formGroup: FormGroup;
  formArrayControl: FormArray ;
  formArrayModel: DynamicFormArrayModel;

  constructor(private formService: DynamicFormService){}
  
  ngOnInit(){
    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.formArrayControl = this.formGroup.get("myFormArray") as FormArray; 
    this.formArrayModel = this.formService.findById("myFormArray", this.formModel) as DynamicFormArrayModel;
  
  }
  addItem() {
    this.formService.addFormArrayGroup(this.formArrayControl, this.formArrayModel);
}
removeItem(context: DynamicFormArrayModel, index: number) {
  this.formService.removeFormArrayGroup(index, this.formArrayControl, context);
}
clear() {
    this.formService.clearFormArray(this.formArrayControl, this.formArrayModel);
}
  
}
