import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pais } from '../../models/pais.model';
import { Usuario } from '../../models/usuario.model';
import { Editorial } from '../../models/Editorial.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { EditorialService } from '../../services/editorial.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  selector: 'app-crud-editorial-update',
  templateUrl: './crud-editorial-update.component.html',
  styleUrls: ['./crud-editorial-update.component.css'],
})
export class CrudEditorialUpdateComponent {

  formsActualiza = this.formBuilder.group({
    validaRazonSocial: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')],],
    validaDireccion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9á-úÁ-ÚñÑ.,# ]{5,100}')],],
    validaRUC: ['', [Validators.required, Validators.pattern('[0-9]{11}')],],
    validaGerente: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')],],
    validaFechaCreacion: ['', [Validators.required]],
    validaPais: ['', Validators.min(1)]
  });


  lstPais: Pais[] = [];
  objUsuario: Usuario = {};

  objEditorial: Editorial = {
    razonSocial: '',
    direccion: '',
    ruc: '',
    gerente: '',
    fechaCreacion: new Date(),
    pais: {
      idPais: -1,
    },
  };

  constructor(
    private utilService: UtilService,
    private tokenService: TokenService,
    private editorialService: EditorialService,
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.objEditorial = data;

    this.utilService.listaPais().subscribe((x) => (this.lstPais = x));

    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  actualizar() {
    if (this.formsActualiza.valid) {
      this.objEditorial.usuarioRegistro = this.objUsuario;
      this.objEditorial.usuarioActualiza = this.objUsuario;

      this.editorialService.actualizaCrud(this.objEditorial).subscribe((x) => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro ID: ' + this.objEditorial.idEditorial,
          text: x.mensaje,
        });
      });
    } 
  }
}
