import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Alumno } from '../../models/alumno.model';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { AlumnoService } from '../../services/alumno.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-alumno',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './agregar-alumno.component.html',
  styleUrls: ['./agregar-alumno.component.css']
})
export class AgregarAlumnoComponent /*implements OnInit*/ {

  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];
  alumno: Alumno ={
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
    utilService.listaPais().subscribe(
      x => this.lstPais=x
    );

    utilService.listaModalidadAlumno().subscribe(
      x => this.lstModalidad = x
    );
    
    this.objUsuario.idUsuario = tokenService.getUserId();
  }


  registra(){
    this.alumno.usuarioActualiza = this.objUsuario;
    this.alumno.usuarioRegistro = this.objUsuario;
    this.alumnoService.registrar(this.alumno).subscribe(
      x=>{
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        })
      },
    );
  }

  /*
  ngOnInit(): void {
  }*/


}
