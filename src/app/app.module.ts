import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { FormulaModalComponent } from './components/formula-modal/formula-modal.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop'
import { MathCanvasComponent } from './components/canvas/canvas.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { InteractionComponent } from './components/interaction/interaction.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormulaModalComponent,
    MathCanvasComponent,
    DictionaryComponent,
    InteractionComponent
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
