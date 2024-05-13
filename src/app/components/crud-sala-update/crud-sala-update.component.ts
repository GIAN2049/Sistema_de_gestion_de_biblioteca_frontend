import { Component, Inject, inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { Sala } from '../../models/sala.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { SalaService } from '../../services/sala.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule],
  selector: 'app-crud-sala-update',
  templateUrl: './crud-sala-update.component.html',
  styleUrls: ['./crud-sala-update.component.css']
})
export class CrudSalaUpdateComponent {

  lstTipoSala : DataCatalogo[]=[];
  lstSede : DataCatalogo[]=[];
  lstEstadoReserva : DataCatalogo[]=[];
  objUsuario : Usuario = {};

  formsActualiza = this.formBuilder.group ({ 
    validaTexto: ['', [Validators.required, Validators.pattern('^.{4,5}$')]] , 
    validaPiso: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
    validaNumAlumnos: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
    validaRecursos:['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]] , 
    validaSede: ['', Validators.min(1)] , 
    validaTipoSala: ['', Validators.min(1)] ,  
    validaEstadoReserva: ['', Validators.min(1)] , 
});

  objSala: Sala = {
    numero:"",
    piso:0,
    numAlumnos:0,
    recursos:"",
    tipoSala:{
      idDataCatalogo:-1
    },
    sede:{
      idDataCatalogo:-1
    },
    estadoReserva:{
      idDataCatalogo:-1
    }

  }

  constructor(private utilService: UtilService,
              private tokenService: TokenService,
              private salaService: SalaService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { 

      this.objSala = data;          
      
      this.utilService.listaTipoSala().subscribe(
        x => this.lstTipoSala = x
      );
      this.utilService.listaSede().subscribe(
        x => this.lstSede = x
      );
      this.utilService.listaEstadoReserva().subscribe(
        x => this.lstEstadoReserva = x
      );
      this.objUsuario.idUsuario = tokenService.getUserId();          

   }

   actualizar(){

    if(this.formsActualiza.valid){
    this.objSala.usuarioRegistro = this.objUsuario;
    this.objSala.usuarioActualiza = this.objUsuario;

    this.salaService.actualizarCrud(this.objSala).subscribe((x) =>{
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
      });
    }
   }


}
