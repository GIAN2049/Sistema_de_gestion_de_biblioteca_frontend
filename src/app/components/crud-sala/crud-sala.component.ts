import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SalaService } from '../../services/sala.service';
import { CrudSalaAddComponent } from '../crud-sala-add/crud-sala-add.component';
import { Sala } from '../../models/sala.model';
import { MatTableDataSource } from '@angular/material/table';
import { CrudSalaUpdateComponent } from '../crud-sala-update/crud-sala-update.component';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-sala',
  templateUrl: './crud-sala.component.html',
  styleUrls: ['./crud-sala.component.css']
})
export class CrudSalaComponent implements OnInit {

  //grilla
  dataSource:any;

  //clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  //cabecera

  displayedColumns = ["idSala","numero","piso","numAlumnos","recursos","tipo","sede","estado","acciones"];

  //filtro de la consulta
  filtro: string = "";

  constructor(private dialogService:MatDialog,private salaService: SalaService) {

   }

   openAddDialog(){
    console.log(">>> openAddDialog [ini]");
    const dialogo = this.dialogService.open(CrudSalaAddComponent);
    dialogo.afterClosed().subscribe(
          x => {
               console.log(">>> x >> "  +  x); 
               if (x == 1){
                  this.refreshTable();
               }
          }
    );
    console.log(">>> openAddDialog [fin]");
}

   openUpdateDialog(obj:Sala){
    console.log(">>> openAddDialog [ini]");
    const dialogo = this.dialogService.open(CrudSalaUpdateComponent,{data:obj});
    dialogo.afterClosed().subscribe(
          x => {
               console.log(">>> x >> "  +  x); 
               if (x == 1){
                  this.refreshTable();
               }
          }
    );
    console.log(">>> openAddDialog [fin]");
}

refreshTable(){
  console.log(">>> refreshTable [ini]");
  var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
  this.salaService.consultarCrud(msgFiltro).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Sala>(x);
          this.dataSource.paginator = this.paginator
        }
  );

  console.log(">>> refreshTable [fin]");
}

  elimina(obj:Sala){
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
          if (result.isConfirmed) {
              this.salaService.eliminarCrud(obj.idSala || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    }) 
  }  


  ngOnInit(): void {
  }

}
