import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../materials.module';
import { FormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    //MaterialModule,
    FormsModule,
  ],
})
export class UsersModule { }
