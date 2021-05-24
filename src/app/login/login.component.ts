import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '../interfaces/iuser';
import { DadesProductesService } from '../services/dades-productes.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  post: any;
  errorMessage = '';
  username = "";
  password = "";
  nombre="";
  tokOK=false;
  myForm: FormGroup = this.formBuilder.group({
    username: [this.username, Validators.required],
    password: [this.password, Validators.required],
    'recordar': new FormControl(false),
  });

  constructor(private formBuilder: FormBuilder, private producteService: DadesProductesService, private cookieService: CookieService,  private router: Router) { }

  ngOnInit() {
    this.logInOut();
    this.createForm();
    this.recordar();
  }
  recordar(){
    var user = this.cookieService.get('username');
    var password = this.cookieService.get('password');
    if(user) this.myForm.controls['username'].setValue(user);
    if(password) this.myForm.controls['password'].setValue(password);
  }
  logInOut1(){
    var token = this.cookieService.get('token');
    if(!token){
      this.tokOK=true;
    }else{
      this.tokOK=false;
      this.producteService.postToken(this.cookieService.get('token')).pipe(
        map(resultadotoken => {
          if (resultadotoken.status == 200) {
            console.log("TODO OK ------ " + resultadotoken.body);
            this.nombre=resultadotoken.body+'';
          }else{
            this.tokOK=true;
            this.nombre="";
            this.sesionCaducada();
          }
        }),
        catchError(error => {
            return this.errorMessage = error;
        })
    );
      //this.sesionCaducada();
    }
  }

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
  salir(){
    this.cookieService.delete('token');
    this.nombre="";
    window.location.reload();
  }
  createForm() {
    this.myForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      'recordar': new FormControl(false),
    });
  }
  onSubmit(data: IUser) {
    //console.log("EEEEEOOOOOOO"+this.myForm.value.recordar);
    console.log(data);
    if (data.username == null || data.password == null || data.username == "" || data.password == "") {
      this.errorMessage = "ERROR. Usuario o contraseña en blanco.";
    } else {
      this.producteService.postUser(data).subscribe(
        resultadotoken => {
          //console.log(resultadotoken);
          //console.log("AQUIIIIIIIIIIIIIIIIIIII");
          if (resultadotoken.status == 200) {
            console.log("TODO OK ...... " + resultadotoken.body);
            const dateNow = new Date();
            dateNow.setHours(dateNow.getHours() + 1);
            this.cookieService.set('token', resultadotoken.body+'', dateNow);
            if(this.myForm.value.recordar){//recordar checkbox
              this.cookieService.set('username', data.username);
              //this.cookieService.set('password', data.username);
            }
            //this.router.navigate(['welcome']);//Envia hacia el listado de coches
            window.location.reload();
            //window.location.href="this.router.navigate(['welcome'])";
            //this.router.navigate(['welcome']);//Envia hacia el listado de coches
            //this.post = producto;
            //this.router.navigate(['list']);//Envia hacia el listado de coches
          } else {
            this.errorMessage = "ERROR: HA FALLADO ALGO AL ENVIAR LOS DATOS AL SERVIDOR";
          }
        },
        error => {
          //this.errorMessage = "Error "+error.status + ": " + error.statusText;
          //console.log(error.status + ": "+error.statusText);
          if(error.status==401){
            this.errorMessage = "ERROR: Usuario o contraseña incorrecto.";
          }else{
            this.errorMessage = "Error, algo ha ido mal. "+error.status + ": " + error.statusText;
          }
        }
      );
      
    }
    //post.categorianom = this.categorianom;
    //producto.categoria=new categoria
    //this.post = producto;
  }
}
