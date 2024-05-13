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

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  selector: 'app-transaccion-asignacion-rol',
  templateUrl: './transaccion-asignacion-rol.component.html',
  styleUrls: ['./transaccion-asignacion-rol.component.css']
})
export class TransaccionAsignacionRolComponent {

  lstUsuario: Usuario[] = [];
  lstRol: Rol[] = [];
  lstRolDeUsuario: Rol[] = [];

  usuario : string = "-1";
  rol : string = "-1";


  dataSource:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idRol","nombre",'actions'];

  constructor(private utilService: UtilService, private rolService: RolService){
      this.utilService.listaRol().subscribe(
              x => this.lstRol = x
        );
        this.utilService.listaUsuario().subscribe(
          x => this.lstUsuario = x
        );
  }

  //Se agregó cargaRol
  cargaRol(){
    this.rolService.listaRolDeUsuario(this.usuario).subscribe(
          x   => {
                this.lstRolDeUsuario =x
                this.dataSource = new MatTableDataSource(this.lstRolDeUsuario);
                this.dataSource.paginator = this.paginator
          }
    );
  }

  registraRol(){
    console.log(">> registraRol >>> ");
    console.log(">> this.usuario >>> " + this.usuario );
    console.log(">> this.rol >>> " + this.rol );
    this.rolService.registraRol(this.usuario, this.rol).subscribe(
        x => {
          Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
          this.lstRolDeUsuario = x.lista
          this.dataSource = new MatTableDataSource(this.lstRolDeUsuario);
          this.dataSource.paginator = this.paginator

        }
    );
  }

  eliminaRol(obj:Rol){
      console.log(">> eliminaRol >>> ");
      console.log(">> this.usuario >>> " + this.usuario );
      console.log(">> this.rol >>> " + this.rol );
      this.rolService.eliminaRol(this.usuario, obj.idRol!).subscribe(
            x => {
              Swal.fire({ title: "Mensaje", text: x.mensaje, icon: "info" });
              this.lstRolDeUsuario = x.lista
              this.dataSource = new MatTableDataSource(this.lstRolDeUsuario);
              this.dataSource.paginator = this.paginator

            }
      );
  }
}
