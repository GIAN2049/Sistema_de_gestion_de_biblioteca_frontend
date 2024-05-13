import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { MenuComponent } from '../../menu/menu.component';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Tesis } from '../../models/tesis.model';
import { TesisService } from '../../services/tesis.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],

  selector: 'app-agregar-tesis',
  templateUrl: './agregar-tesis.component.html',
  styleUrls: ['./agregar-tesis.component.css']
})
export class AgregarTesisComponent {

  formsRegistra = this.formBuilder.group({
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

  constructor(private tesisService: TesisService, private utilService: UtilService, private tokenService: TokenService, private formBuilder: FormBuilder) {
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

  registra() {
    if (this.formsRegistra.valid) {
      this.objTesis.usuarioRegistro = this.objUsuario;
      this.objTesis.usuarioActualiza = this.objUsuario;

      this.tesisService.registrar(this.objTesis).subscribe(
        x => {
          Swal.fire({
            icon: 'info',
            title: 'Resultado del Registro',
            text: x.mensaje,
          })
        },
      );
      //limpia el formulario
      this.formsRegistra.reset();

      //borra los errores
      Object.keys(this.formsRegistra.controls).forEach(x => {
        this.formsRegistra.get(x)?.setErrors(null);
      });
    }
  }
 
}
