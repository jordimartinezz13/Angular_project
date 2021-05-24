import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormularioCrearCocheComponent } from './formulario-crear-coche/formulario-crear-coche.component';
import { ProductoUnicoComponent } from './producto-unico/producto-unico.component';
import { Error404Component } from './error404/error404.component'

const routes: Routes = [
  {path:'welcome', component: WelcomeComponent},
  {path:'list', component: ProductListComponent},
  {path:'login', component: LoginComponent},
  {path:'crearCoche', component: FormularioCrearCocheComponent},
  {path:'error404', component: Error404Component},
  //{path:'productoUnico', component: ProductoUnicoComponent},
  {path:'productoUnico/:id', component: ProductoUnicoComponent},
  {path:'', redirectTo:'welcome', pathMatch: 'full'},
  {path:'**', redirectTo:'welcome', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


  
}
