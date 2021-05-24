import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  titolTaula = 'Llistat Pràctica Angular';
  title = 'Compara vehiculos';
  name = 'Jordi'
  surname = 'Martínez'
  

  retornarNomCognom(){
  return this.name + ' ' + this.surname;
  }



  titol:string = "Benvingut a la web de productes";

}