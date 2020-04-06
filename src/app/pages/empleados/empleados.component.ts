import { Component, OnInit } from '@angular/core';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
})
export class EmpleadosComponent implements OnInit {

      empleados: EmpleadoModel[] = [];
      cargando = false;

      constructor( private empleadosService: EmpleadosService ) { }

      ngOnInit()
      {

        this.cargando = true;
        this.empleadosService.getEmpleados()
          .subscribe( resp => {
            this.empleados = resp;
            this.cargando = false;
          });

      }

      borrarEmpleado( empleado: EmpleadoModel, i: number ) {

        Swal.fire({
          title: '¿Está seguro?',
          text: `Está seguro que desea borrar a ${ empleado.nombreCompleto }`,
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true
        }).then( resp => {

          if ( resp.value )
          {
            this.empleados.splice(i, 1);
            this.empleadosService.borrarEmpleado( empleado.id ).subscribe();
          }

        });

      }

}
