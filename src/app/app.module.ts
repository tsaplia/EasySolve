import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { FormulaModelComponent } from './components/formula-model/formula-model.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormulaModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatIconModule,
    ClipboardModule,
    CdkDrag,
    CdkDropList,
    CdkDragHandle
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
