import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { Libro } from '../../models/libro.model';
import { Editorial } from '../../models/Editorial.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { LibroService } from '../../services/libro.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css']
})
export class AgregarLibroComponent {

  lstCategoriaLibro : DataCatalogo[] = [];
  lstTipoLibro : DataCatalogo[] = [];
  lstEditorial : Editorial[] = [];
  lstEstadoPrestamo : DataCatalogo[] = [];
  objUsuario : Usuario = {};

  //declaracion de las validaciones
  formsRegistra = this.formBuilder.group({
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

  constructor(private utilService: UtilService,
              private TokenService: TokenService,
              private libroService: LibroService,
              private formBuilder : FormBuilder) {

        utilService.listaCategoriaDeLibro().subscribe(
                x =>  this.lstCategoriaLibro = x
        );
        utilService.listaTipoLibroRevista().subscribe(
                x =>  this.lstTipoLibro = x
        );
        utilService.listaEditorial().subscribe(
              x =>  this.lstEditorial = x
        );
        utilService.listaEstadoLibro().subscribe(
              x =>  this.lstEstadoPrestamo = x
        );
        this.objUsuario.idUsuario = TokenService.getUserId();
  }

  registra(){
    if (this.formsRegistra.valid){
      this.objLibro.usuarioRegistro = this.objUsuario;
      this.objLibro.usuarioActualiza = this.objUsuario;

      this.libroService.registrarCrud(this.objLibro).subscribe(
            x=>{
              Swal.fire({
                icon: 'info',
                title: 'Resultado del Registro',
                text: x.mensaje,
              });

              //limpia el formulario
              this.formsRegistra.reset();

              //borra los errores
              Object.keys(this.formsRegistra.controls).forEach(x => {
                  this.formsRegistra.get(x)?.setErrors(null);
              });
            },
      );
    }
  }
}
