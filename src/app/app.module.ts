import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './materials.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Core/authentication/interceptors/auth-interceptor/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from "./Core/core.module";
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LocalStorageService } from './Core/storages/local-storage/local-storage.service';
import { UserStateService } from './core/state-managments/users-state/user-state.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //MaterialModule,
    MatSnackBarModule,
    MatDialogModule,
    //CoreModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    //LocalStorageService,
    //UserStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
