//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';

import { IProducte } from '../interfaces/iproducte';

import { DadesProductesService } from '../services/dades-productes.service';

import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  //template: '<p>{{titolLlistat1}}</p>',
  styleUrls: ['./product-list.component.css']
})

//export class AppComponent{
//  titolTaula = 'Llistat Pràctica Angular';
//}

export class ProductListComponent implements OnInit {

  //constructor() { }
  constructor(private producteService: DadesProductesService, private router: Router) {//DadesProductesService
  }

  //ngOnInit(): void {
  //}

//  ngOnInit() {
//    console.log("Listat de productes inicialitzat");
    //this.productes = this.producteService.getDades();
//    this.producteService.getDades().subscribe(
//     productes => {
//        console.log("Coches = ",productes);    
//      this.productes = productes; //sin parse, los coches ya deberían ser un array de coches
//    });
//    console.log("Coches1 = ", this.productes);//para ver el objeto por consola   
//  }
  ngOnInit() {
    console.log("Listat de productes inicialitzat");
    //this.productes = this.producteService.getDades();
    this.producteService.getDades().subscribe(
     productes => {
        console.log("Coches = ",productes);    
      this.productes = productes; //sin parse, los coches ya deberían ser un array de coches
    },(error) => {
      this.errorMessage = "ERROR:" + error.message; // treurem l'error a html
      console.log("ERROR: ", error.message);
      });
    console.log("Coches1 = ", this.productes);//para ver el objeto por consola   
  }
 

  errorMessage = '';
  listFilter = '';//filtro predeterminado
  titolLlistat = 'Llista de productes';


  @Input() tituloIMPORT: string = "";


  //productes:any[] = [{producteImatge:null, producteNom:'Focus', productePreu:15000, producteCategoria:'Ford'},
  //{producteImatge:null, producteNom:'Megane', productePreu:30000, producteCategoria:'Renault'},
  //{producteImatge:null, producteNom:'Mii', productePreu:13000, producteCategoria:'Seat'}];


  //productes1:IProducte[] = [{producteId:1, producteNom:'Focus', productePreu:15000, producteCategoria:'Ford', producteImatge:"null"},
  //{producteId:2, producteNom:'Focus', productePreu:15000, producteCategoria:'Ford', producteImatge:"null"},
  //{producteId:3, producteNom:'Focus', productePreu:15000, producteCategoria:'Ford', producteImatge:"null"}];


  productes: IProducte[] = [];


}
