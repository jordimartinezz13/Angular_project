import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DadesProductesService } from '../services/dades-productes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router, private producteService: DadesProductesService) { }

  ngOnInit() {
    
    this.logInOut();
  }
  tokOK=false;
  nombre="";

  logInOut(){
    var token = this.cookieService.get('token');
    if(!token){
      this.tokOK=true;
    }else{
      this.tokOK=false;
      this.producteService.postToken(this.cookieService.get('token')).subscribe(
        resultadotoken => {
          if (resultadotoken.status == 200) {
            //console.log("TODO OK ...... " + resultadotoken.body);
            this.nombre=resultadotoken.body+'';
          }else{
            this.tokOK=true;
            this.nombre="";
            this.sesionCaducada();
          }
        }
      );
      //this.sesionCaducada();
    }
  }

  sesionCaducada(){
    if(this.nombre=="" || this.nombre == null){
      this.tokOK=true;
      this.nombre="";
      this.cookieService.delete('token');
      alert("Tu sesión esta caducada o es erronea, vuelva a entrar.");
      window.location.reload();
    }
  }

  logInOut1(){
    var token = this.cookieService.get('token');
    if(!token){
      this.tokOK=true;
    }else{
      this.tokOK=false;
    }
  }

  
  logout(){
    this.tokOK=false;
    this.cookieService.delete('token');
    window.location.reload();
  }
}
