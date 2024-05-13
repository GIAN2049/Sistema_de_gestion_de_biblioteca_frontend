import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';

import { Title } from '@angular/platform-browser';
import { Alumno } from '../../models/alumno.model';
import { Libro } from '../../models/libro.model';
import { Usuario } from '../../models/usuario.model';
import { DevolucionService } from '../../services/devolucion.service';
import { TokenService } from '../../security/token.service';
import { ModelAlumnoComponent } from '../model-alumno/model-alumno.component';
import { ModelLibroComponent } from '../model-libro/model-libro.component';
import { DevolucionHasLibro } from '../../models/devolucionHasLibro.model';
import { DevolucionHasLibroPK } from '../../models/devolucionHasLibroPK.model';
import { Devolucion } from '../../models/devolucion.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';

@Component({
    standalone: true,
    imports: [AppMaterialModule, FormsModule, CommonModule, ReactiveFormsModule, MenuComponent],
  selector: 'app-transaccion-devolucion-libro',
  templateUrl: './transaccion-devolucion-libro.component.html',
  styleUrls: ['./transaccion-devolucion-libro.component.css']
})
export class TransaccionDevolucionLibroComponent {

  objAlumno : Alumno = {}; 
  objLibro : Libro = {};
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idLibro","titulo","anio","serie",'actions'];

  lstLibros : Libro [] = [];
  objUsuario: Usuario = {} ;

  constructor(private dialogService: MatDialog, 
              private devolucionService: DevolucionService,
              private tokenService: TokenService) {
              this.objUsuario.idUsuario = tokenService.getUserId();
  }
 ngOnInit(): void {}

  buscaAlumno(){
      console.log(">>> buscaAlumno ");
      const dialog  = this.dialogService.open(ModelAlumnoComponent);
      dialog.afterClosed().subscribe( () => this.cargaAlumno());
  }

  cargaAlumno(){
      var str = window.sessionStorage.getItem("ALUMNO") || '{}';
      this.objAlumno = JSON.parse(str);
  }

  buscaLibro(){
    console.log(">>> buscaLibro ");
    const dialog  = this.dialogService.open(ModelLibroComponent);
    dialog.afterClosed().subscribe( () => this.cargaLibro());
  }

  cargaLibro(){
      var str = window.sessionStorage.getItem("LIBRO") || '{}';
      this.objLibro = JSON.parse(str);
  }

  agregarLibro(){
      if (!this.objLibro.idLibro ) {
         Swal.fire({title: "Validación", text: "Por favor, complete todos los campos", icon: "info"});
         return;
      }
      if (this.lstLibros.some(x => x.idLibro === this.objLibro.idLibro)) {
        Swal.fire({ title: "Validación", text: "El libro ya está en la lista", icon: "info" });
        return;
      }
      this.lstLibros.push(this.objLibro);
      this.dataSource = new MatTableDataSource(this.lstLibros);
      this.dataSource.paginator = this.paginator 
  }

  eliminaLibro(objProducto: Libro){
    const index = this.lstLibros.findIndex(x => x.idLibro === objProducto.idLibro);
    if (index !== -1) {
      this.lstLibros.splice(index, 1); 
      this.dataSource = new MatTableDataSource(this.lstLibros);
      this.dataSource.paginator = this.paginator;
    }
  }

  registrarDevolucion(){
     let lstDetalles : DevolucionHasLibro[] = [];
     
     this.lstLibros.forEach( (item) => {
         var pk : DevolucionHasLibroPK = {
                idLibro : item.idLibro
         }
         var objDetalle : DevolucionHasLibro = {
              libro : item,
              devolucionHasLibroPK : pk
         }
         lstDetalles.push(objDetalle);
     });

     const fechaPrestamo = (<HTMLInputElement>document.getElementById("fechaPrestamo")).value;
     const fechaDevolucion = (<HTMLInputElement>document.getElementById("fechaDevolucion")).value;

     let objDevolucion : Devolucion = {
        fechaPrestamo : new Date(fechaPrestamo),
        fechaDevolucion : new Date(fechaDevolucion),
        alumno : this.objAlumno,
        usuario : this.objUsuario,
        detallesDevolucion : lstDetalles,
     };

     this.devolucionService.inserta(objDevolucion).subscribe(x => {
          Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
          this.objAlumno = {};
          this.objLibro = {};
          this.lstLibros = [];
          this.dataSource = new MatTableDataSource(this.lstLibros);
          this.dataSource.paginator = this.paginator;
     });

  }
  
}

