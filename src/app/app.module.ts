import {BrowserModule, HammerModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GalleryComponent} from './components/gallery/gallery.component';
import {GalleryModalComponent} from './components/gallery-modal/gallery-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    GalleryModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HammerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
