import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { Usuario } from '../../models/usuario.model';
import { Autor } from '../../models/autor.model';
import { UtilService } from '../../services/util.service';
import { ThisReceiver, Token } from '@angular/compiler';
import { AutorService } from '../../services/autor.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../security/token.service';
import { DataCatalogo } from '../../models/dataCatalogo.model';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent,ReactiveFormsModule],
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent{

  lstPais : Pais[] = [];
  lstGradoAutor: DataCatalogo[]=[];
  objUsuario: Usuario = {} ;

//declaracion de las validaciones
formsRegistra = this.formBuilder.group({ 
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
              private formBuilder:FormBuilder){

       this.utilService.listaPais().subscribe(
              x =>  this.lstPais = x
       );     
       this.utilService.listaGradoAutor().subscribe(
              x =>  this.lstGradoAutor =x
       )
       this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra(){
    if(this.formsRegistra.valid){
        this.objAutor.usuarioRegistro = this.objUsuario;
        this.objAutor.usuarioActualiza = this.objUsuario;

        this.autorService.registrar(this.objAutor).subscribe(
              x=>{
                Swal.fire({
                  icon: 'info',
                  title: 'Resultado del Registro - Eddy Paucar',
                  text: x.mensaje,
                });

                //Limpiar
                this.formsRegistra.reset();

                Object.keys(this.formsRegistra.controls).forEach(x => {
                  this.formsRegistra.get(x)?.setErrors(null);
                });
              },
        );
      }
    }
  }