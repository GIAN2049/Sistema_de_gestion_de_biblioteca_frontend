import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { AppMaterialModule } from '../../app.material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditorialService } from '../../services/editorial.service';
import { CrudEditorialAddComponent } from '../crud-editorial-add/crud-editorial-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { Editorial } from '../../models/Editorial.model';
import { CrudEditorialUpdateComponent } from '../crud-editorial-update/crud-editorial-update.component';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-crud-editorial',
  templateUrl: './crud-editorial.component.html',
  styleUrls: ['./crud-editorial.component.css'],
})
export class CrudEditorialComponent {
  //Grila
  dataSource: any;
  //Clase para la paginacion
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = [
    'idEditorial',
    'razonSocial',
    'direccion',
    'ruc',
    'gerente',
    'pais',
    'estado',
    'acciones'
  ];

  filtro: string = '';

  constructor(
    private dialogService: MatDialog,
    private editorialService: EditorialService
  ) {}

  refreshTable() {
    console.log('>>> refreshTable [ini]');
    var msgFiltro = this.filtro == '' ? 'todos' : this.filtro;
    this.editorialService.consultarCrud(msgFiltro).subscribe((x) => {
      this.dataSource = new MatTableDataSource<Editorial>(x);
      this.dataSource.paginator = this.paginator;
    });

    console.log('>>> refreshTable [fin]');
  }

  openAddDialog() {
    console.log('>>> openAddDialog [ini]');
    const dialogo = this.dialogService.open(CrudEditorialAddComponent);
    dialogo.afterClosed().subscribe((x) => {
      console.log('>>> x >> ' + x);
      if (x === 1) {
        this.refreshTable();
      }
    });
    console.log('>>> openAddDialog [fin]');
  }

  openUpdateDialog(obj: Editorial) {
    console.log('>>> openUpdateDialog [ini]');
    const dialogo = this.dialogService.open(CrudEditorialUpdateComponent, {
      data: obj,
    });
    dialogo.afterClosed().subscribe((x) => {
      console.log('>>> x >> ' + x);
      if (x === 1) {
        this.refreshTable();
      }
    });
    console.log('>>> openUpdateDialog [fin]');
  }

  actualizaEstado(obj: Editorial) {
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.editorialService.actualizaCrud(obj).subscribe();
  }

  elimina(obj: Editorial) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: 'Los cambios no se van a revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.editorialService
          .eliminarCrud(obj.idEditorial || 0)
          .subscribe((x) => {
            this.refreshTable();
            Swal.fire('Mensaje', x.mensaje, 'info');
          });
      }
    });
  }
}
