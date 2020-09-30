import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressListElementComponent } from './address-list/address-list-element/address-list-element.component';
import { AddressViewComponent } from './address-list/address-view/address-view.component';
import {FormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddressListComponent,
    AddressListElementComponent,
    AddressViewComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
