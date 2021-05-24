import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, using } from 'rxjs';
import { DadesProductesService } from '../services/dades-productes.service';
import { IProducte } from '../interfaces/iproducte';
import { ICategoria } from '../interfaces/icategoria';
//import { IImagen } from '../interfaces/iimagen';

import { Router } from '@angular/router';
import { error } from 'protractor';
import { table } from 'console';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-formulario-crear-coche',
  templateUrl: './formulario-crear-coche.component.html',
  styleUrls: ['./formulario-crear-coche.component.css']
})
export class FormularioCrearCocheComponent implements OnInit {

  post: any;
  nom = "";
  preu = 0;
  categoriaid = "";
  imatge = "";
  categorianom = "";
  imagenAEnviar: any;
  contadorOK = 0;
  ultimaIDC = "";

  myForm: FormGroup = this.formBuilder.group({
    id: 0,
    nom: [this.nom, Validators.required],
    preu: [this.preu, Validators.required],
    imatge: [this.imatge, Validators.required],
    categoriaid: [this.categoriaid, Validators.required],
    categorianom: [this.categorianom, Validators.required]
  });
  categorias: ICategoria[] = [];

  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private producteService: DadesProductesService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.createForm();
    this.crearSelect();
  }


  createForm() {
    this.myForm = this.formBuilder.group({
      id: 0,
      nom: [null, Validators.required],
      preu: [null, Validators.required],
      imatge: [null, Validators.required],
      categoriaid: [null, Validators.required],
      categorianom: [null, Validators.required]
    });
  }

  crearSelect() {
    this.producteService.getDadesCategoria().subscribe(
      categorias1 => {
        console.log("categorias = ", categorias1);
        this.categorias = categorias1; //sin parse, las categorias ya deberían ser un array de categorias
      }, (error) => {
        this.errorMessage = "ERROR:" + error.message; // treurem l'error a html
        console.log("ERROR: ", error.message);
      });
    console.log("Categorias = ", this.categorias);
  }


  onSubmit2(producto: IProducte) {
    //post.categorianom = this.categorianom;
    //producto.categoria=new categoria
    //this.post = producto;

    console.log(this.post);
    this.producteService.postProducte1(producto).subscribe(
      producte => {
        console.log(producte);
        //console.log("AQUIIIIIIIIIIIIIIIIIIII");
        if (producte.status == 200) {
          this.post = producto;
          this.router.navigate(['list']);//Envia hacia el listado de coches
        } else {
          this.post = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR";
        }
      }
    );
    //this.router.navigate(['list']);//Envia hacia el listado de coches
    //}
    //const ps = this.producteService.postProducte(produc);
  }

  ultimaID() {

    this.producteService.getUltimaId().subscribe(
      productes => {
        console.log("eeeeeeeeeeee = ", productes.id);
        this.ultimaIDC = productes.id + ""; //sin parse, los coches ya deberían ser un array de coches
      }, (error) => {
        this.errorMessage = "ERROR:" + error.message; // treurem l'error a html
        console.log("ERROR: ", error.message);
      });
    //console.log("eeeeeeeeeeeeee = ", this.ultimaIDC);//para ver el objeto por consola   
    return this.ultimaIDC;
  }

  onSubmit(producto: IProducte) {
    //post.categorianom = this.categorianom;
    //producto.categoria=new categoria
    //this.post = producto;


    var token = this.cookieService.get('token');
    if (token) {

      if (producto.nom != null && producto.preu != null && this.contadorOK != 0) {
        //if (this.imagenAEnviar.type == "image/jpeg" || this.imagenAEnviar.type == "image/jpg" ||
        //  this.imagenAEnviar.type == "image/png") {
        producto.imatge = this.ultimaID() + producto.nom + producto.preu;
        this.producteService.postFileImagen(this.imagenAEnviar, producto.imatge, token).subscribe(

          imageRespuesta => {
            console.log(imageRespuesta);
            if (imageRespuesta != "Fichero subido") {
              this.errorMessage = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR (Foto)";
            } else {
              console.log(this.post);
              var hola = this.producteService.postProducte(producto, token).subscribe(
                producte => {
                  console.log(producte);
                  //console.log("AQUIIIIIIIIIIIIIIIIIIII");
                  if (producte.status == 200) {
                    this.post = producto;
                    this.router.navigate(['list']);//Envia hacia el listado de coches
                  } else {
                    this.errorMessage = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR";
                  }
                },
                error => {
                  this.errorMessage = "Error " + error.status + ": " + error.statusText;
                  //console.log(error.status + ": "+error.statusText);
                }
              );
            }
          },
          error => {
            this.errorMessage = "Error " + error.status + ": " + error.statusText;
            //console.log(error.status + ": "+error.statusText);
          }

        );

        //} else {
        //  this.errorMessage = "ERROR: Fichero adminito jpeg, jpg o png.";
        //}
      } else {
        this.errorMessage = "ERROR EN LOS CAMPOS.";
      }
    }
    else {
      alert("ERROR: Tienes que estar registrado para poder utilizar este servicio.");
    }
  }
  onSubmit1(producto: IProducte) {
    //post.categorianom = this.categorianom;
    //producto.categoria=new categoria
    //this.post = producto;

    if (producto.nom != null && producto.preu != null && this.contadorOK != 0) {



      producto.imatge = this.ultimaID() + producto.nom + producto.preu;
      this.producteService.postFileImagen1(this.imagenAEnviar, producto.imatge).subscribe(

        imageRespuesta => {
          console.log(imageRespuesta);
          if (imageRespuesta != "Fichero subido") {
            this.errorMessage = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR (Foto)";
          } else {
            console.log(this.post);
            this.producteService.postProducte1(producto).subscribe(
              producte => {
                console.log(producte);
                //console.log("AQUIIIIIIIIIIIIIIIIIIII");
                if (producte.status == 200) {
                  this.post = producto;
                  this.router.navigate(['list']);//Envia hacia el listado de coches
                } else {
                  this.errorMessage = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR";
                }
              }
            );
            //this.router.navigate(['list']);//Envia hacia el listado de coches
            //}
            //const ps = this.producteService.postProducte(produc);
          }
          //console.log("AQUIIIIIIIIIIIIIIIIIIII");
          //if (imageRespuesta.status == 200) {
          //  this.post = producto;
          //  this.router.navigate(['list']);//Envia hacia el listado de coches
          //} else {
          //  this.post = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR";
        }

      );

    } else {
      this.errorMessage = "ERROR EN LOS CAMPOS.";
    }

  }

  noValid(nControl: string): boolean {
    //return (!this.myForm.get(nControl).valid &&
    //this.myForm.get(nControl).touched);
    return true;
  }

  public fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var files = fileInput.target.files[0];
      if (files.type == "image/jpeg" || files.type == "image/jpg" || files.type == "image/png") {
        this.errorMessage = "";
        //console.log(fileInput.target.files[0].type);
        this.imagenAEnviar = fileInput.target.files[0];
        this.contadorOK = 1;
      } else {
        this.errorMessage = "ERROR: El fichero '" +files.name+"' no es un formato admitido.\n(jpeg, jpg o png)";
        this.contadorOK = 0;
      }
    }
  }

  public cargandoImagen(files: FileList) {

    //var imagen: IImagen[]=[{id:1, imagen: System.Text.Encoding.UTF8.GetBytes(files), coche_id:1}];
    //imagen.id=0;
    //id:number;
    //imagen:File;
    //coche_id:number;
    this.imagenAEnviar = files[0];

    if (files[0].type == "image/jpeg" || files[0].type == "image/jpg" || files[0].type == "image/png") {
      this.errorMessage = "";
      this.contadorOK = 1;
      //      this.producteService.postFileImagen(files[0], " 0").subscribe(

      //        imageRespuesta => {
      //          console.log(imageRespuesta);
      //          if(imageRespuesta!="Fichero subido"){
      //            this.errorMessage = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR";
      //          }
      //console.log("AQUIIIIIIIIIIIIIIIIIIII");
      //if (imageRespuesta.status == 200) {
      //  this.post = producto;
      //  this.router.navigate(['list']);//Envia hacia el listado de coches
      //} else {
      //  this.post = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR";
      //          }

      //      );
    } else {
      this.errorMessage = "ERROR:" + " El fichero no es un formato admitido";
      this.contadorOK = 0;
    }

  }
}

