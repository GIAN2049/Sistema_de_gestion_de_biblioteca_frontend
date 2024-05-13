import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { Pais } from '../../models/pais.model';
import { Alumno } from '../../models/alumno.model';
import { Usuario } from '../../models/usuario.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { AlumnoService } from '../../services/alumno.service';
import { UtilService } from '../../services/util.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../security/token.service';
import { AppMaterialModule } from '../../app.material.module';

@Component({
  standalone: true,
  selector: 'app-crud-alumno-add',
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './crud-alumno-add.component.html',
  styleUrls: ['./crud-alumno-add.component.css']
})
export class CrudAlumnoAddComponent {
  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];
  objAlumno: Alumno ={
      nombres: "",
      fechaNacimiento: new Date(),
      pais:{
        idPais:-1
      },
      modalidad:{
        idDataCatalogo: -1
      }
  }
  objUsuario: Usuario = {} ;

  constructor(private alumnoService:AlumnoService, private utilService: UtilService, private tokenService: TokenService) { 
    this.utilService.listaPais().subscribe(
      x => this.lstPais=x
    );

    this.utilService.listaModalidadAlumno().subscribe(
      x => this.lstModalidad=x
    );

    this.utilService.listaModalidadAlumno().subscribe(
      x => this.lstModalidad = x
    );
    
    this.objUsuario.idUsuario = tokenService.getUserId();
  }


  registra(){
    this.objAlumno.usuarioActualiza = this.objUsuario;
    this.objAlumno.usuarioRegistro = this.objUsuario;
    this.alumnoService.registrar(this.objAlumno).subscribe(
      x=>{
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        })
      },
    );
  }
}
