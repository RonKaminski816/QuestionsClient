//General Basic Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/authentication/interceptors/auth-interceptor/auth.interceptor';

//Material
import { MaterialModule } from './materials.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

//NgRx 
import { StoreModule } from '@ngrx/store';
import { questionsStateReducer } from './core/state-managments/questions-state/questions-state.reducer';

//My Custom Creations
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from "./core/core.module";
import { AppComponent } from './app.component';

//ANT
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    //We need to tel NgRx which reducers are involved and for that we call the forRoot(). we pass inside a 
    //'action reducer map', it's a JS object where I can define any identifier, and then the reducer that belongs to that identifier.
    StoreModule.forRoot({questionsState: questionsStateReducer}),//the reducer function is now assigned as a value to this 'questionsState' key.
    //We told NgRx where to find our reducer and now when the app restart, NgRx will take 
    //that reducer into account and set up an application store for us where it registers this reducer,
    //and any actions that are dispatched will reach that reducer.

    //MaterialModule,
    MatSnackBarModule,
    MatDialogModule,
    CoreModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
