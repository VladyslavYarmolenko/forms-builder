import {ComponentPortal, DomPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-styling-form-section',
  templateUrl: './styling-form-section.component.html',
  styleUrls: ['./styling-form-section.component.scss']
})

export class StylingFormSectionComponent implements AfterViewInit {
  @Input() isFieldSelected: boolean;
  @ViewChild('templatePortalContent1') templatePortalContent1: TemplateRef<unknown>;
  @ViewChild('templatePortalContent2') templatePortalContent2: TemplateRef<unknown>;

  selectedPortal: Portal<any>; 
  templatePortal1: TemplatePortal<any>;
  templatePortal2: TemplatePortal<any>;

  constructor(private _viewContainerRef: ViewContainerRef) { }

  ngAfterViewInit() {
    this.templatePortal1 = new TemplatePortal(this.templatePortalContent1, this._viewContainerRef);
    this.templatePortal2 = new TemplatePortal(this.templatePortalContent2, this._viewContainerRef);
    this.selectedPortal = this.templatePortal1;
   
    // setInterval(() => {
      if (this.isFieldSelected) {
        this.selectedPortal = this.templatePortal2
      } else {
        this.selectedPortal = this.templatePortal1
      }
    // }, 2000)
  }

}
