import { Component, Inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { Autor } from '../../models/autor.model';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { AutorService } from '../../services/autor.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule],
  selector: 'app-crud-autor-update',
  templateUrl: './crud-autor-update.component.html',
  styleUrls: ['./crud-autor-update.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class CrudAutorUpdateComponent {
  lstPais : Pais[] = [];
  lstGradoAutor: DataCatalogo[]=[];
  objUsuario: Usuario = {} ;
  fecha= new FormControl(new(Date));

  formsActualiza = this.formBuilder.group({ 
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]] ,
    validaApellidos :['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,30}')]] ,
    validaFechaNacimiento: ['', [Validators.required]] ,
    validaTelefono: ['', [Validators.required, Validators.pattern('01[0-9]{7}$')]] ,
    validaCelular: ['', [Validators.required, Validators.pattern('[9][0-9]{8}')]] ,
    validaOrcid:  ['',[Validators.required,Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]],
    validaPais: ['', Validators.min(1)] , 
    validaGrado: ['', Validators.min(1)] ,
    });

  objAutor: Autor ={
    nombres: "",
    apellidos: "",
    fechaNacimiento : new Date(),
    telefono: "",
    celular: "",
    orcid: "",
    pais:{
      idPais:-1
    },
    grado:{
      idDataCatalogo:-1
    }
  }

  constructor(private utilService: UtilService, 
    private tokenService: TokenService,
    private autorService:AutorService,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any){

      data.fechaNacimiento= new Date(new Date(data.fechaNacimiento).getTime() + (1000 * 60 * 60 * 24));
this.objAutor = data;

      console.log(">>>[ini] >>> objAutor")
      console.log(this.objAutor);

this.utilService.listaPais().subscribe(
    x =>  this.lstPais = x
);     
this.utilService.listaGradoAutor().subscribe(
    x =>  this.lstGradoAutor =x
)
this.objUsuario.idUsuario = tokenService.getUserId();
}

actualizar(){
  if(this.formsActualiza.valid){
this.objAutor.usuarioRegistro = this.objUsuario;
this.objAutor.usuarioActualiza = this.objUsuario;

this.autorService.actualizaCrud(this.objAutor).subscribe((x )=> {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro ID: ' + this.objAutor.idAutor,
        text: x.mensaje,
      }); 
    },
  );
}
}
}
