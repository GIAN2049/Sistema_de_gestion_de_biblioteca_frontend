import { Component, Inject, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Editorial } from '../../models/Editorial.model';
import { Usuario } from '../../models/usuario.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { LibroService } from '../../services/libro.service';
import Swal from 'sweetalert2';
import { Libro } from '../../models/libro.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  selector: 'app-crud-libro-update',
  templateUrl: './crud-libro-update.component.html',
  styleUrls: ['./crud-libro-update.component.css']
})
export class CrudLibroUpdateComponent {

  lstCategoriaLibro : DataCatalogo[] = [];
  lstTipoLibro : DataCatalogo[] = [];
  lstEditorial : Editorial[] = [];
  lstEstadoPrestamo : DataCatalogo[] = [];

    //declaracion de las validaciones
    formsActualiza = this.formBuilder.group({
      validaTitulo: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]] ,
      validaAnio: ['', [Validators.required, Validators.pattern('[0-9]{4}')]] ,
      validaSerie: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{12}$')] ] ,
      validaCategoriaLibro: ['', Validators.min(1)] ,
      validatipoLibro: ['', Validators.min(1)] ,
      validaEditorial: ['', Validators.min(1)] ,
      validaestadoPrestamo: ['', Validators.min(1)] ,
    });

  objLibro : Libro = {
    titulo: "",
    anio: 0,
    serie: "",
    categoriaLibro:{
      idDataCatalogo:-1
    },
    tipoLibro:{
      idDataCatalogo:-1
    },
    editorial:{
      idEditorial:-1
    },
    estadoPrestamo:{
      idDataCatalogo:-1
    }
  }
  objUsuario : Usuario = {};

  constructor(private utilService: UtilService,
              private TokenService: TokenService,
              private libroService: LibroService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder : FormBuilder,){

        this.objLibro = data;

        this.utilService.listaCategoriaDeLibro().subscribe(
              x =>  this.lstCategoriaLibro = x
        );
        this.utilService.listaTipoLibroRevista().subscribe(
              x =>  this.lstTipoLibro = x
        );
        this.utilService.listaEditorial().subscribe(
              x =>  this.lstEditorial = x
        );
        this.utilService.listaEstadoLibro().subscribe(
              x =>  this.lstEstadoPrestamo = x
        );
        this.objUsuario.idUsuario = TokenService.getUserId();
        }

actualizar(){
  if (this.formsActualiza.valid){
    this.objLibro.usuarioActualiza = this.objUsuario;
    this.objLibro.usuarioRegistro = this.objUsuario;
    this.libroService.actualizarCrud(this.objLibro).subscribe(
        (x)=>{
          Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: x.mensaje,
          })
        },
      );
    }
  }
}
