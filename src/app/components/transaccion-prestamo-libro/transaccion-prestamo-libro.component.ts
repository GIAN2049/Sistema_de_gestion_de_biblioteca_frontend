import { Component, OnInit, ViewChild, model } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, Validators } from '@angular/forms';
import { CommonModule, Time } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../models/alumno.model';
import { Libro } from '../../models/libro.model';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../security/token.service';
import { PrestamoService } from '../../services/prestamo.service';
import { disableDebugTools } from '@angular/platform-browser';
import { ModelAlumnoComponent } from '../model-alumno/model-alumno.component';
import { ModelLibroComponent } from '../model-libro/model-libro.component';
import Swal from 'sweetalert2';
import { PrestamoHasLibro } from '../../models/prestamoHasLibro.model';
import { PrestamoHasLibroPK } from '../../models/prestamoHasLibroPK.model';
import { Prestamo } from '../../models/prestamo.model';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-transaccion-prestamo-libro',
  templateUrl: './transaccion-prestamo-libro.component.html',
  styleUrls: ['./transaccion-prestamo-libro.component.css']
})
export class TransaccionPrestamoLibroComponent {

  objAlumno : Alumno = {};
  objLibro : Libro = {};
  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idLibro","titulo",'actions'];

  lstLibros : Libro [] = [];
  objUsuario: Usuario = {} ;
  fechaDevolucion :Date = new Date() ;
  fechaPrestamo : Date = new Date();

  //VALIDACION DE FECHA


  constructor(private dialogService: MatDialog, 
              private prestamoService: PrestamoService,
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
    if (!this.objAlumno.idAlumno || !this.objAlumno.nombres || !this.objAlumno.apellidos) {
      Swal.fire({title: "Validación", text: "Por favor, ingrese alumno", icon: "info"});
      return;
   }
    if (!this.objLibro.idLibro || !this.objLibro.titulo ) {
       Swal.fire({title: "Validación", text: "Por favor, ingrese libro", icon: "info"});
       return;
    }
    if (this.lstLibros.some(x => x.idLibro === this.objLibro.idLibro)) {
      Swal.fire({ title: "Validación", text: "El Libro ya está en la lista", icon: "info" });
      return;
    }
    this.lstLibros.push(this.objLibro);
    this.dataSource = new MatTableDataSource(this.lstLibros);
    this.dataSource.paginator = this.paginator 
}


eliminaLibro(objLibro: Libro){
  const index = this.lstLibros.findIndex(x => x.idLibro === objLibro.idLibro);
  if (index !== -1) {
    this.lstLibros.splice(index, 1); 
    this.dataSource = new MatTableDataSource(this.lstLibros);
    this.dataSource.paginator = this.paginator;
  }
}

registrarPrestamo(){


  let lstDetalles : PrestamoHasLibro[] = [];

  this.lstLibros.forEach( (item) => {
      var pk : PrestamoHasLibroPK = {
             idLibro : item.idLibro
      }

      var objDetalle : PrestamoHasLibro = {

           libro : item,
           prestamoHasLibroPK : pk
      }

      lstDetalles.push(objDetalle);
  });

  let objPrestamo : Prestamo = {
     alumno : this.objAlumno,
     usuario : this.objUsuario,
    fechaDevolucion : this.fechaDevolucion,
    fechaPrestamo : this.fechaPrestamo,
    detallesPrestamo : lstDetalles
  };

  if (!lstDetalles|| lstDetalles.length === 0) {
    Swal.fire({title: "Validación", text: "Debe agregar algún libro", icon: "info"});
    return;
 }

  this.prestamoService.inserta(objPrestamo).subscribe(x => {
       Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
       this.objAlumno = {};
       this.objLibro = {};
       this.lstLibros = [];
       this.dataSource = new MatTableDataSource(this.lstLibros);
       this.dataSource.paginator = this.paginator;
  });
}
}
