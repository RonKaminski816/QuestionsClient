//General Basic Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
//HTTP Auth
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/authentication/interceptors/auth-interceptor/auth.interceptor';
//Material
import { MaterialModule } from './materials.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
//NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import * as fromAppState from "src/app/core/state-ngrx/app.reducer";
import { QuestionsStateEffects } from './core/state-ngrx/questions-state/questions-state.effects';
import { UserAuthStateEffects } from './core/state-ngrx/users-state/user-auth-state.effects';
//My Custom Creations
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from "./core/core.module";
import { AppComponent } from './app.component';
//ANT
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { environment } from 'src/environments/environment';

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
    StoreModule.forRoot(fromAppState.appReducer),
    //the reducer function is now assigned as a value to this 'questionsState' key.
    //We told NgRx where to find our reducer and now when the app restart, NgRx will take
    //that reducer into account and set up an application store for us where it registers this reducer,
    //and any actions that are dispatched will reach that reducer.

    EffectsModule.forRoot([QuestionsStateEffects, UserAuthStateEffects]),
    //We basically restricting the output to only log messages when we are in production
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
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
