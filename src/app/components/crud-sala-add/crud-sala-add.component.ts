import { Component } from '@angular/core';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { Sala } from '../../models/sala.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { SalaService } from '../../services/sala.service';
import Swal from 'sweetalert2';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-crud-sala-add',
  templateUrl: './crud-sala-add.component.html',
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule],
  styleUrls: ['./crud-sala-add.component.css']
})
export class CrudSalaAddComponent {

  lstTipoSala : DataCatalogo[]=[];
  lstSede : DataCatalogo[]=[];
  lstEstadoReserva : DataCatalogo[]=[];
  objUsuario : Usuario = {};

    //declaracion de validaciones

    formsRegistra = this.formBuilder.group ({ 
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
              private formBuilder: FormBuilder) { 
      
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

   registra(){

    this.objSala.usuarioRegistro = this.objUsuario;
    this.objSala.usuarioActualiza = this.objUsuario;

    this.salaService.registrarCrud(this.objSala).subscribe(
      x=>{
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: x.mensaje,
        });
        //limpia el formulario
        this.formsRegistra.reset();
        
        //borra los errores
        Object.keys(this.formsRegistra.controls).forEach(x=>{
          this.formsRegistra.get(x)?.setErrors(null);
        });
      },
    );

   }

}
