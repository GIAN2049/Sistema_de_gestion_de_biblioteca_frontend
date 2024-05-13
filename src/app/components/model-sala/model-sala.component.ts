import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SalaService } from '../../services/sala.service';
import { Sala } from '../../models/sala.model';
import { MatTableDataSource } from '@angular/material/table';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';

const OPCIONES_SALA = 'Opciones';

@Component({
  selector: 'app-model-sala',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './model-sala.component.html',
  styleUrl: './model-sala.component.css',
})
export class ModelSalaComponent {

  filtro: string = '';

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns = [
    'idSala',
    'numero',
    'piso',
    'numAlumnos',
    'recursos',
    'estado',
    'actions',
  ];
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [5, 10];
  dataSource: any;

  constructor(private dialog: MatDialog, private salaService: SalaService) {
    this.refreshTable('todos');
  }

  seleccioneSala(objSala: Sala) {
    window.sessionStorage.setItem('SALA', JSON.stringify(objSala));
    this.dialog.closeAll();
  }

  applyFilter() {
    console.log('>>> applyFilter ');
    this.refreshTable(this.filtro);
  }

  onPageChange(any: any) {
    console.log('>> length >> ' + any.length);
    console.log('>> pageIndex >> ' + any.pageIndex);
    console.log('>> pageSize >> ' + any.pageSize);
    console.log('>> previousPageIndex >> ' + any.previousPageIndex);
    this.refreshTable(this.filtro);
  }

  private refreshTable(filtro: string) {
    console.log('>>> refreshTable ');
    this.salaService
      .consultarFiltro(filtro, this.pageIndex, this.pageSize)
      .subscribe((x) => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
      });
  }
}
