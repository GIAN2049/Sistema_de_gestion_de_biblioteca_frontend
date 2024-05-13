import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Alumno } from '../../models/alumno.model';
import { Usuario } from '../../models/usuario.model';
import { AlumnoService } from '../../services/alumno.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';
import { AppMaterialModule } from '../../app.material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-alumno-update',
  templateUrl: './crud-alumno-update.component.html',
  styleUrls: ['./crud-alumno-update.component.css']
})
export class CrudAlumnoUpdateComponent {

  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];
  objAlumno: Alumno = {
    nombres: "",
    fechaNacimiento: new Date(),
    pais: {
      idPais: -1
    },
    modalidad: {
      idDataCatalogo: -1
    }
  }
  objUsuario: Usuario = {};

  constructor(private alumnoService: AlumnoService, private utilService: UtilService, private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.objAlumno = data;

    this.utilService.listaPais().subscribe(
      x => this.lstPais = x
    );

    this.utilService.listaModalidadAlumno().subscribe(
      x => this.lstModalidad = x
    );

    this.objUsuario.idUsuario = tokenService.getUserId();
  }


  actualizar() {
    this.objAlumno.usuarioActualiza = this.objUsuario;
    this.objAlumno.usuarioRegistro = this.objUsuario;
    this.alumnoService.actualizarCrud(this.objAlumno).subscribe(
      x => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
      },
    );
  }
}
