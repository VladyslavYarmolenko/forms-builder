import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl:'./form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent{
  isFieldSelected: boolean = false;

  onSelectField(status:boolean){
    console.log('status', status)
    this.isFieldSelected = status;
  }
}
