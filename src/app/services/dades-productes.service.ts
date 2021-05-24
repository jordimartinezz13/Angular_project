import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducte } from '../interfaces/iproducte';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ICategoria } from '../interfaces/icategoria';
import { IUser } from '../interfaces/iuser';
import { map, catchError } from 'rxjs/operators';
import {throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesProductesService {
  /** POST: añadir nuevo producto en BBDD */
  postProducte1(produc: IProducte): Observable<HttpResponse<string>> {
    console.log("ENVIAS ESTO: ");
    console.log(produc);
    console.log("HAS ENVIADO ESO.");
    //return this._http.post<IProducte[]>("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche1",
    // produc);//Esto devuelve el objeto pero si lo pones debes poner Observable<IProducte[]> donde pone Observable<HttpResponse<string>>
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche1",
      produc, { observe: 'response', responseType: 'text' });

  }
  /** POST: añadir nuevo producto en BBDD */
  postProducte(produc: IProducte, token: string): Observable<HttpResponse<string>> {
    console.log("ENVIAS ESTO: ");
    const formData = new FormData();
    //JSON.parse(JSON.stringify(object))
    formData.append('producto', JSON.stringify(produc));//pasar a json
    formData.append('token', token);
    //console.log(formData);

    console.log("HAS ENVIADO ESO.");
    //return this._http.post<IProducte[]>("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche1",
    // produc);//Esto devuelve el objeto pero si lo pones debes poner Observable<IProducte[]> donde pone Observable<HttpResponse<string>>
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche2",
    formData, { observe: 'response', responseType: 'text' });

  }

  //postUser(user : string,pass : string): Observable<HttpResponse<string>> {
    postUser(usuario: IUser){
    //var usuario = "{username = "+user+",password ="+ pass+"}";
    console.log("ENVIAS ESTO: ");
    console.log(usuario);
    //console.log(usuario+" <==> "+user + " - " + pass);
    const formData = new FormData();
    formData.append('username', usuario.username);
    formData.append('password', usuario.password);
    console.log("HAS ENVIADO ESO.");

    //var json = JsonConvert.SerializeObject(product);

    //return this._http.post<IProducte[]>("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche1",
    // produc);//Esto devuelve el objeto pero si lo pones debes poner Observable<IProducte[]> donde pone Observable<HttpResponse<string>>
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/firebase/credencials",
    formData, {observe: 'response'});

  }


  postToken(token: string){
    //var usuario = "{username = "+user+",password ="+ pass+"}";
    console.log("ENVIAS ESTO: ");
    console.log(token);
    //console.log(usuario+" <==> "+user + " - " + pass);
    const formData = new FormData();
    formData.append('token', token);
    console.log("HAS ENVIADO ESO.");

    //var json = JsonConvert.SerializeObject(product);

    //return this._http.post<IProducte[]>("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche1",
    // produc);//Esto devuelve el objeto pero si lo pones debes poner Observable<IProducte[]> donde pone Observable<HttpResponse<string>>
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/firebase/credencialsTOKENp",
    formData, {observe: 'response'});

  }
  postToken1(token: string){
    //var usuario = "{username = "+user+",password ="+ pass+"}";
    console.log("ENVIAS ESTO: ");
    console.log(token);
    //console.log(usuario+" <==> "+user + " - " + pass);
    const formData = new FormData();
    formData.append('token', token);
    console.log("HAS ENVIADO ESO.");

    //var json = JsonConvert.SerializeObject(product);

    //return this._http.post<IProducte[]>("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche1",
    // produc);//Esto devuelve el objeto pero si lo pones debes poner Observable<IProducte[]> donde pone Observable<HttpResponse<string>>
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/firebase/credencialsTOKENp",
    formData, {observe: 'response'}).pipe(
      map(response => {
          // doSomething 
      }),
      catchError(error => {
          this.errorHandler(error);
          return `Caught an error: ${error}`;
      })
  );

  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message||"Server not responding");
 }

  getNomToken(token: string){
    //var usuario = "{username = "+user+",password ="+ pass+"}";
    console.log("ENVIAS ESTO: ");
    console.log(token);
    //console.log(usuario+" <==> "+user + " - " + pass);
    const formData = new FormData();
    formData.append('token', token);
    console.log("HAS ENVIADO ESO.");

    //var json = JsonConvert.SerializeObject(product);

    //return this._http.post<IProducte[]>("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/crearCoche1",
    // produc);//Esto devuelve el objeto pero si lo pones debes poner Observable<IProducte[]> donde pone Observable<HttpResponse<string>>
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/firebase/credencialsTOKEN",
    formData, {observe: 'response'});

  }

  getCocheId(id: string): Observable<IProducte>{
    //var usuario = "{username = "+user+",password ="+ pass+"}";
    console.log("ENVIAS ESTO: ");
    console.log(id);
    console.log("HAS ENVIADO ESO.");
    var url="http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/mostrarUnCoche/";
    return this._http.get<IProducte>(url+id);

  }

  //  productes: IProducte[] = [
  //    {
  //      producteId: 1, producteImatge: 'assets/img/focus.jpeg', producteNom: 'Focus',
  //      productePreu: 15000, producteCategoria: 'Ford'
  //    },
  //    {
  //      producteId: 2, producteImatge: 'assets/img/saxo.jpeg', producteNom: 'Saxo',
  //      productePreu: 10000, producteCategoria: 'Renault'
  //    },
  //    {
  //      producteId: 3, producteImatge: 'assets/img/patrol.jpeg', producteNom: 'Patrol',
  //      productePreu: 20000, producteCategoria: 'Nisan'
  //    }
  //  ]
  //                productes: IProducte[]=[      {        producteId: 1, producteImatge: 'assets/img/focus.jpeg', producteNom: 'Focus',        productePreu: 15000, producteCategoria: 'Ford'}]

  //incorporar al producte service un servei http
  constructor(private _http: HttpClient) {
  }
  //public getDades(): IProducte[] {
  //  return this.productes;
  //}
  getDadesCategoria(): Observable<ICategoria[]> {
    return this._http.get<ICategoria[]>('http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/listCategoria');
    //return this._http.get<IProducte[]>('http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/coche/listJSON');
    //return this._http.get<IProducte[]>('http://localhost/Clase/WebService/PHP/controller/list_coches_ctl.php');
    //get retorna un observable
  }
  getDades(): Observable<IProducte[]> {
    return this._http.get<IProducte[]>('http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/listCoche');
    //return this._http.get<IProducte[]>('http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/coche/listJSON');
    //return this._http.get<IProducte[]>('http://localhost/Clase/WebService/PHP/controller/list_coches_ctl.php');
    //get retorna un observable
  }

  postFileImagen(imagenParaSubir: File, coheId: string, token: string) {
    const formData = new FormData();
    formData.append('imagenPropia', imagenParaSubir, coheId + ".png");//imagenParaSubir.name);
    formData.append('token', token);
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/subirImagen1"
      , formData);

  }

  postFileImagen1(imagenParaSubir: File, coheId: string) {
    const formData = new FormData();
    formData.append('imagenPropia', imagenParaSubir, coheId + ".png");//imagenParaSubir.name);
    return this._http.post("http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/subirImagen"
      , formData);

  }

  getUltimaId(): Observable<IProducte>  {
    return this._http.get<IProducte> ('http://localhost/Clase/WebService/symfony/WS_jordi/ws_jordi/public/index.php/api/ultimaID');

  }
}