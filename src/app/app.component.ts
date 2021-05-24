import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titolTaula = 'Llistat Pràctica Angular';
  title = 'TODOCOCHES.COM';
  name = 'Jordi'
  surname = 'Martínez'
  retornarNomCognom(){
  return this.name + ' ' + this.surname;
  }
}