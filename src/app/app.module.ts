import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormBuilderModule } from './form-builder/form-builder.module';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './store-auth/store-auth.effects'

import * as formBuilderReducer from './store_form-builder/store-form-builder.reducer';

import { LoginComponent } from './login/login.component';
import { FormBuilderGuard } from '../guard-route/form-builder.guard';
import { RegisterComponent } from './register/register.component';
import { EffectsModule } from '@ngrx/effects';
import { FormDataComponent } from './form-builder/form-data/form-data.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FormDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    DragDropModule,
    FormBuilderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({storeFormBuilder: formBuilderReducer.reducer }),
    EffectsModule.forRoot([ AuthEffects ]),
    ReactiveFormsModule,
    StoreDevtoolsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production, 
    }),
  ],
  providers: [FormBuilderGuard, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
