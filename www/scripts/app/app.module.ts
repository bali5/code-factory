import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterialModule, MdIconRegistry, OVERLAY_PROVIDERS, MdSnackBar } from '@angular/material';

// Components
import { AppComponent } from './app.component';

import { LoginComponent } from './../lobby/login';
import { LobbyFindComponent } from './../lobby/lobby.find';
import { LobbyCreateComponent } from './../lobby/lobby.create';

import { DialogTextElement } from './../common/dialog';
import { DialogElement } from './../common/dialog';
import { DialogProvider, Dialog } from './../common/dialog.provider';

// Meta
import { AppContext } from './app.context';
import { Service } from './../connection/service';

// Store
import { AppRedux } from './../store/app.state';
import { NavigationActions } from './../store/action/navigation.action';

/* Pipes */
import { RoundPipe, AbsPipe, MaxPipe, MinPipe } from './../common/pipes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyFindComponent,
    LobbyCreateComponent,
    DialogElement,
    DialogTextElement,
    // Pipes
    RoundPipe,
    AbsPipe,
    MaxPipe,
    MinPipe,
    // Common
  ],
  bootstrap: [AppComponent],
  providers: [
    DialogProvider,
    MdIconRegistry,
    OVERLAY_PROVIDERS,
    MdSnackBar,
    Service,
    AppContext,
    // Store
    AppRedux,
    NavigationActions
  ],
  entryComponents: [
    DialogTextElement
  ]
})
export class AppModule { }