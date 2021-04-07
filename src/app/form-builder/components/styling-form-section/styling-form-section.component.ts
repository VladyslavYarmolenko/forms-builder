import { selectField } from './../../../store/store.selectors';
import {ComponentPortal, DomPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-styling-form-section',
  templateUrl: './styling-form-section.component.html',
  styleUrls: ['./styling-form-section.component.scss']
})

export class StylingFormSectionComponent implements AfterViewInit {
  @ViewChild('templatePortalContent1') templatePortalContent1: TemplateRef<unknown>;
  @ViewChild('templatePortalContent2') templatePortalContent2: TemplateRef<unknown>;
  
  isFieldSelected$: Observable<boolean>;
  selectedPortal: Portal<any>; 
  templatePortal1: TemplatePortal<any>;
  templatePortal2: TemplatePortal<any>;

  constructor(private _viewContainerRef: ViewContainerRef, private store: Store<{ state: any }>) { 
    store.select(selectField).subscribe(isFieldSelected => {
      console.log('STYLING isFieldSelected', isFieldSelected)
      if (isFieldSelected) {
        this.selectedPortal = this.templatePortal2
      } else {
        this.selectedPortal = this.templatePortal1
      }
    });
  }

  ngAfterViewInit() {
    this.templatePortal1 = new TemplatePortal(this.templatePortalContent1, this._viewContainerRef);
    this.templatePortal2 = new TemplatePortal(this.templatePortalContent2, this._viewContainerRef);
    this.selectedPortal = this.templatePortal1;   
  }

}
