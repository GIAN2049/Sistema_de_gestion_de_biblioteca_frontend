import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { MatDialog } from '@angular/material/dialog';
import { CrudAutorAddComponent } from '../crud-autor-add/crud-autor-add.component';
import { AutorService } from '../../services/autor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../../models/autor.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudAutorUpdateComponent } from '../crud-autor-update/crud-autor-update.component';
import Swal from 'sweetalert2';


@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-autor',
  templateUrl: './crud-autor.component.html',
  styleUrls: ['./crud-autor.component.css']
})
export class CrudAutorComponent {

    //Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera
    displayedColumns = ["idAutor","nombres","apellidos","fechaNacimiento","telefono","celular","orcid","pais","grado","estado","acciones"];

    //filtro de la consulta
    filtro: string = "";
    
    constructor(private dialogService: MatDialog, private autorService: AutorService){

    }

    openAddDialog(){
          console.log(">>> openAddDialog [ini]");
          const dialogo = this.dialogService.open(CrudAutorAddComponent);
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

    refreshTable(){
        console.log(">>> refreshTable [ini]");
        var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
        this.autorService.consultarCrud(msgFiltro).subscribe(
              x => {
                this.dataSource = new MatTableDataSource<Autor>(x);
                this.dataSource.paginator = this.paginator
              }
        );

        console.log(">>> refreshTable [fin]");
}

      openUpdateDialog(obj:Autor){
        console.log(">>> openUpdateDialog [ini]");
        const dialogo = this.dialogService.open(CrudAutorUpdateComponent, {data:obj});
        dialogo.afterClosed().subscribe(
              x => {
                  console.log(">>> x >> "  +  x); 
                  if (x === 1){
                      this.refreshTable();
                  }
              }
        );
  console.log(">>> openUpdateDialog [fin]");
}

      actualizaEstado(obj:Autor){
            obj.estado = obj.estado == 1 ? 0 : 1;
            this.autorService.actualizaCrud(obj).subscribe();
      }

      elimina(obj:Autor){
            Swal.fire({
                  title: '¿Desea eliminar?',
                  text: "Los cambios no se van a revertir",
                  icon: 'warning',
                  showCancelButton:true,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText:'Si, eliminar',
                  cancelButtonText:'No, cancelar'
            }).then((result)=>{
                  if (result.isConfirmed){
                        this.autorService.eliminarCrud(obj.idAutor || 0).subscribe(
                              x=>{
                                    this.refreshTable();
                                    Swal.fire('Mensaje',x.mensaje,'info');
                              }
                        );
                  }
            })
      }

}