import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CharbonCardComponent } from './charbon-card/charbon-card.component';
import { MainButtonComponent } from './main-button/main-button.component';
import { ColorButtonComponent } from './color-button/color-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CharbonCardComponent,
    MainButtonComponent,
    ColorButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
