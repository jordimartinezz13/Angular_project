import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProducte } from '../interfaces/iproducte';
import { DadesProductesService } from '../services/dades-productes.service';

@Component({
  selector: 'app-producto-unico',
  templateUrl: './producto-unico.component.html',
  styleUrls: ['./producto-unico.component.css']
})
export class ProductoUnicoComponent implements OnInit {

  idCoche = "-1";
  coche: IProducte = {
    id : 1,
    nom : "",
    preu : 0,
    categoria : { 
      id : 0,
      nom : ""
    },
    imatge : ""
  };

  constructor(private rutaActiva: ActivatedRoute, private producteService: DadesProductesService, private router: Router) { }

  ngOnInit(): void {
    //console.log(this.rutaActiva.snapshot.params);
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        //console.log(params);
        this.idCoche = params.id;
      }
    );
    this.cargarCoche();
  }
  
  cargarCoche(){
    this.producteService.getCocheId(this.idCoche).subscribe(
      producte => {
        this.coche = producte;
      },
      error => {
        this.router.navigate(['error404']);
        //this.errorMessage = "Error " + error.status + ": " + error.statusText;
        //console.log(error.status + ": "+error.statusText);
      }
    );
  }

  visita(){
    alert("Visita solicitada!\n\nSeguro que el "+this.coche.categoria.nom +" " +this.coche.nom+" te encantará.\n\nNos vemos en tu concesionario más cercano.");
  }

  routerGoList(){
    this.router.navigate(['list']);
  }

}
