import { Component, Inject, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { Tesis } from '../../models/tesis.model';
import { TokenService } from '../../security/token.service';
import { Usuario } from '../../models/usuario.model';
import { TesisService } from '../../services/tesis.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule],
  selector: 'app-crud-tesis-update',
  templateUrl: './crud-tesis-update.component.html',
  styleUrls: ['./crud-tesis-update.component.css'],
  providers: [provideNativeDateAdapter()],
})

export class CrudTesisUpdateComponent {

  formsActualiza = this.formBuilder.group({
    validaTitulo: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]],
    validaFechaCreacion: ['', [Validators.required]],
    validaTema: ['', Validators.min(1)],
    validaIdioma: ['', Validators.min(1)],
    validaCentroEstudios: ['', Validators.min(1)],
  });

  lstTema: DataCatalogo[] = [];
  lstCentroEstudios: DataCatalogo[] = [];
  lstIdioma: DataCatalogo[] = [];

  objTesis: Tesis = {
    titulo: "",
    fechaCreacion: new Date(),
    tema: {
      idDataCatalogo: -1
    },
    idioma: {
      idDataCatalogo: -1
    },
    centroEstudios: {
      idDataCatalogo: -1
    }
  }
  objUsuario: Usuario = {};

  constructor(private utilService: UtilService,
    private tokenService: TokenService,
    private tesisService: TesisService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    data.fechaCreacion = new Date(new Date(data.fechaCreacion).getTime() + (1000 * 60 * 60 * 24));
    this.objTesis = data;

    utilService.listaTema().subscribe(
      x => this.lstTema = x
    );
    utilService.listaCentroEstudios().subscribe(
      x => this.lstCentroEstudios = x
    );
    utilService.listaIdioma().subscribe(
      x => this.lstIdioma = x
    );
    this.objUsuario.idUsuario = tokenService.getUserId();
  }


  actualiza() {
    if (this.formsActualiza.valid) {
      this.objTesis.usuarioRegistro = this.objUsuario;
      this.objTesis.usuarioActualiza = this.objUsuario;

      this.tesisService.registrarCrud(this.objTesis).subscribe(
        x => {
          Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: x.mensaje,
          })
        },
      );
      //limpia el formulario
      this.formsActualiza.reset();

      //borra los errores
      Object.keys(this.formsActualiza.controls).forEach(x => {
        this.formsActualiza.get(x)?.setErrors(null);
      });
    }
  }


}