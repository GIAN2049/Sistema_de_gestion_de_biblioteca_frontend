import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LibroService } from '../../services/libro.service';
import { CrudLibroAddComponent } from '../crud-libro-add/crud-libro-add.component';
import { Libro } from '../../models/libro.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudLibroUpdateComponent } from '../crud-libro-update/crud-libro-update.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-libro',
  templateUrl: './crud-libro.component.html',
  styleUrls: ['./crud-libro.component.css']
})
export class CrudLibroComponent {

    //Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera
    displayedColumns = ["idLibro", "titulo","anio","serie","categoriaLibro","tipoLibro", "editorial", "estadoPrestamo","estado", "acciones"];

    //filtro de la consulta
    filtro: string = "";

    constructor(private dialogService: MatDialog, private libroService: LibroService){

    }

    openAddDialog(){
          console.log(">>> openAddDialog [ini]");
          const dialogo = this.dialogService.open(CrudLibroAddComponent);
          dialogo.afterClosed().subscribe(
                x => {
                     console.log(">>> x >> "  +  x);
                     if (x === 1){
                        this.refreshTable();
                     }
                }
          );
          console.log(">>> openAddDialog [fin]");
      }

      openUpdateDialog(obj:Libro){
        console.log(">>> openUpdateDialog [ini]");
        const dialogo = this.dialogService.open(CrudLibroUpdateComponent, {data:obj});
        dialogo.afterClosed().subscribe(
              x => {
                   console.log(">>> x >> "  +  x);
                   if (x === 1){
                      this.refreshTable();
                   }
              }
        );
        console.log(">>> openUpdateDialog [fin]");
      }

    refreshTable(){
        console.log(">>> refreshTable [ini]");
        var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
        this.libroService.consultarCrud(msgFiltro).subscribe(
              x => {
                this.dataSource = new MatTableDataSource<Libro>(x);
                this.dataSource.paginator = this.paginator
              }
        );

        console.log(">>> refreshTable [fin]");
    }

    actualizaEstado(obj:Libro){
      obj.estado =   obj.estado == 1 ? 0 : 1;
      this.libroService.actualizarCrud(obj).subscribe();
    }

    elimina(obj:Libro){
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
                this.libroService.eliminarCrud(obj.idLibro || 0).subscribe(
                      x => {
                            this.refreshTable();
                            Swal.fire('Mensaje', x.mensaje, 'info');
                      }
                );
            }
      })
}

}
