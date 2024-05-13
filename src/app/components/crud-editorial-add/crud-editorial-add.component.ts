import { Component } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { Usuario } from '../../models/usuario.model';
import { Editorial } from '../../models/Editorial.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { EditorialService } from '../../services/editorial.service';
import Swal from 'sweetalert2';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-crud-editorial-add',
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-editorial-add.component.html',
  styleUrls: ['./crud-editorial-add.component.css'],
})
export class CrudEditorialAddComponent {

  formsRegistra = this.formBuilder.group({
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
    private formBuilder : FormBuilder
  ) {
    this.utilService.listaPais().subscribe((x) => (this.lstPais = x));
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra() {

    if (this.formsRegistra.valid){
      this.objEditorial.usuarioRegistro = this.objUsuario;
      this.objEditorial.usuarioActualiza = this.objUsuario;
  
      this.editorialService.registrarCrud(this.objEditorial).subscribe((x) => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado de Registro',
          text: x.mensaje,
        });

        //limpia el formulario

        this.formsRegistra.reset();

        //borra los errores

        Object.keys(this.formsRegistra.controls).forEach(x => {
          this.formsRegistra.get(x)?.setErrors(null);
        });

      });
    }

    
  }
}
