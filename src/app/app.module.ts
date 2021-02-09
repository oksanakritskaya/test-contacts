import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ContactsComponent} from './contacts/contacts.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {LogoutComponent} from './logout/logout.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from "./http.service";
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';
import {NgxsModule} from '@ngxs/store';
import {StoreState} from "./store.state";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    LoginComponent,
    LogoutComponent,
    BottomSheetComponent
  ],
  imports: [
    MatBottomSheetModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    MatFormFieldModule,
    MatSliderModule,
    NoopAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([StoreState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  exports: [MatSliderModule],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
