import { Component, OnInit } from '@angular/core';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

      empleado: EmpleadoModel = new EmpleadoModel();


      constructor( private empleadosService: EmpleadosService,
                   private route: ActivatedRoute ) { }

      ngOnInit() {

        const id = this.route.snapshot.paramMap.get('id');

        if ( id !== 'nuevo' )
         {
          this.empleadosService.getEmpleado( id )
            .subscribe( (resp: EmpleadoModel) => {
              this.empleado = resp;
              this.empleado.id = id;
            });

        }

      }

      guardar( form: NgForm )
      {

        if ( form.invalid )
        {
          console.log('Formulario no válido');
          return;
        }

        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();


        let peticion: Observable<any>;

        if ( this.empleado.id )
        {
          peticion = this.empleadosService.actualizarEmpleado( this.empleado );
        }
         else
        {
          peticion = this.empleadosService.crearEmpleado( this.empleado );
        }

        peticion.subscribe( resp => {
          Swal.fire({
            title: this.empleado.nombreCompleto,
            text: 'Se actualizó correctamente',
            icon: 'success'
          });

        });

      }

}
