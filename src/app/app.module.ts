import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductListFilterPipe } from './product-list/product-list-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormularioCrearCocheComponent } from './formulario-crear-coche/formulario-crear-coche.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { MaterialModule } from '../app/material.module';

import { CookieService } from 'ngx-cookie-service';

import {RouterModule} from '@angular/router';

import { ProductoUnicoComponent } from './producto-unico/producto-unico.component';
import { Error404Component } from './error404/error404.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    ProductListComponent,
    WelcomeComponent,
    ProductListFilterPipe,
    FormularioCrearCocheComponent,
    ProductoUnicoComponent,
    Error404Component

  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

         MatCheckboxModule,
         MatInputModule,
         MatToolbarModule,
         MatSelectModule,
         
         MaterialModule
  ],
  exports: [
         MatCheckboxModule,
         MatInputModule,
         MatToolbarModule,
         MatSelectModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
