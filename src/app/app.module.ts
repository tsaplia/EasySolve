import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from 'ngx-clipboard';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop'
import { MathCanvasComponent } from './components/canvas/canvas.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { InteractionComponent } from './components/interaction/interaction.component';
import { ToastrModule } from 'ngx-toastr';
import { SaveOpenComponent } from './components/save-open/save-open.component';
import { ListComponent } from './components/list/list.component';
import { AddingModalFormulaComponent } from './components/adding-modals/adding-modal-f.component';
import { AddingModalTextComponent } from './components/adding-modals/adding-modal-t.component';
import { CanvasLineComponent } from './components/canvas-line/canvas-line.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddingModalFormulaComponent,
    AddingModalTextComponent,
    MathCanvasComponent,
    DictionaryComponent,
    InteractionComponent,
    SaveOpenComponent,
    ListComponent,
    CanvasLineComponent,
    InfoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ClipboardModule,
    CdkDrag,
    CdkDropList,
    CdkDragHandle,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
