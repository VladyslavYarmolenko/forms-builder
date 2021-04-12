import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeStyleField } from '../../../store_form-builder/store_form-builder.actions'


@Component({
  selector: 'app-constructor-section',
  templateUrl: './constructor-section.component.html',
  styleUrls: ['./constructor-section.component.scss']
})
export class ConstructorSectionComponent implements OnInit {
  isFieldSelected$: Observable<boolean>;
  currentStatus: boolean = true;
  constructor(private store: Store<{ state: any }>) { }

  ngOnInit(): void {
  }
  
  changeSelectedField() {
    if(this.currentStatus === true){
      this.store.dispatch(changeStyleField({ isFieldSelected: this.currentStatus }));
      this.currentStatus = !this.currentStatus;
    } else  {
      this.store.dispatch(changeStyleField({ isFieldSelected: this.currentStatus }))
      this.currentStatus = !this.currentStatus;
    }
  }
}

