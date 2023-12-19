import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { MathjaxModule } from "mathjax-angular";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MathjaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
