import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

    private url = '';


    constructor( private http: HttpClient ) { }


    crearEmpleado( empleado: EmpleadoModel ) {

      return this.http.post(`${ this.url }/empleados.json`, empleado)
              .pipe(
                map( (resp: any) => {
                  empleado.id = resp.name;
                  return empleado;
                })
              );

    }

    actualizarEmpleado( empleado: EmpleadoModel ) {

      const empleadoTemp = {
        ...empleado
      };

      delete empleadoTemp.id;

      return this.http.put(`${ this.url }/empleados/${ empleado.id }.json`, empleadoTemp);


    }

    borrarEmpleado( id: string ) {

      return this.http.delete(`${ this.url }/empleados/${ id }.json`);

    }


    getEmpleado( id: string )
    {
      return this.http.get(`${ this.url }/empleados/${ id }.json`);
    }


    getEmpleados() {


      return this.http.get(`${ this.url }/empleados.json`)
              .pipe(
                map( this.crearArreglo ),
                delay(1500)
              );
    }

    private crearArreglo( empleadosObj: object ) {

      const empleados: EmpleadoModel[] = [];
      if(empleadosObj === null)
      {
        return [];
      }
      Object.keys( empleadosObj ).forEach( key => {

        const empleado: EmpleadoModel = empleadosObj[key];
        empleado.id = key;

        empleados.push( empleado );
      });

      return empleados;

    }

}
