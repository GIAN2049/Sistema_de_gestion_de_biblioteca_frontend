import { Component, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Rol } from '../../models/rol';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { RolService } from '../../services/rol.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Opcion } from '../../security/opcion';
import { OpcionService } from '../../services/opcion.service';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  selector: 'app-transaccion-asignacion-opcion',
  templateUrl: './transaccion-asignacion-opcion.component.html',
  styleUrls: ['./transaccion-asignacion-opcion.component.css']
})
export class TransaccionAsignacionOpcionComponent {

  lstOpcion: Opcion[] = [];
  lstRol: Rol[] = [];
  lstOpcionDeRol: Opcion[] = [];

  opcion : string = "-1";
  rol : string = "-1";


  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idOpcion","nombre",'actions'];

  constructor(private utilService: UtilService, private opcionService: OpcionService){
      this.utilService.listaRol().subscribe(
              x => this.lstRol = x
        );
        this.utilService.listaOpcion().subscribe(
          x => this.lstOpcion = x
        );
  }

  //Se agregó cargaRol
 /* cargaRol(){
    this.opcionService.listaOpcionDeRol(this.rol).subscribe(
          x   => {
                this.lstOpcionDeRol =x
                this.dataSource = new MatTableDataSource(this.lstOpcionDeRol);
                this.dataSource.paginator = this.paginator
          }
    );
  }*/
  cargaOpcion(){
    this.opcionService.listaOpcionDeRol(this.rol).subscribe(
          x   => {
                this.lstOpcionDeRol =x
                this.dataSource = new MatTableDataSource(this.lstOpcionDeRol);
                this.dataSource.paginator = this.paginator
          }
    );
  }
  registraOpcion(){
    console.log(">> registraOpcion >>> ");
    console.log(">> this.rol>>> " + this.rol );
    console.log(">> this.opcion >>> " + this.opcion );
    this.opcionService.registraOpcion(this.rol, this.opcion).subscribe(
        x => {
          Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
          this.lstOpcionDeRol = x.lista
          this.dataSource = new MatTableDataSource(this.lstOpcionDeRol);
          this.dataSource.paginator = this.paginator

        }
    );
  }

  eliminaOpcion(obj:Opcion){
      console.log(">> eliminaRol >>> ");
      console.log(">> this.usuario >>> " + this.rol );
      console.log(">> this.rol >>> " + this.rol );
      this.opcionService.eliminaOpcion(this.rol, obj.idOpcion!).subscribe(
            x => {
              Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
              this.lstOpcionDeRol = x.lista
              this.dataSource = new MatTableDataSource(this.lstOpcionDeRol);
              this.dataSource.paginator = this.paginator

            }
      );
  }
}
