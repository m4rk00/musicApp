import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  baseUri: string = 'http://localhost:4000/api';
  //baseUri: string = 'https://empleadosds02-marco.herokuapp.com/api'
  headers = new HttpHeaders().set('Content-Type' , 'application/json');

  constructor(private http:HttpClient) { }

  //método para agregar una nueva cancion
  newSong(data):Observable<any>{
    let url = `${this.baseUri}/new`;
    return this.http.post(url,data).pipe(catchError(this.errorManagement));
  }

  //método para obtener todas las canciones
  getPlaylist(){
    let url= `${this.baseUri}/playlist`;
    return this.http.get(url);
  }

  //método que obtiene un solo empleado por su id
  getSong(id):Observable<any>{
    let url = `${this.baseUri}/song/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res:Response) => {
        return res || {};
      }),
      catchError(this.errorManagement)
    );
  }

  //método para actualizar un empleado
  updateSong(id,data):Observable<any>{
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url,data,{headers: this.headers}).pipe(
      catchError(this.errorManagement)
    );
  }

  //método para eliminar empleados
  deleteSong(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorManagement)
    );
  }

  //manejador de errores
  errorManagement(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //obtenermos el error del lado del cliente
      errorMessage = error.error.message;
    }else{
      //obtenemos el error del lado del servidor
    errorMessage = `Código de error: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
