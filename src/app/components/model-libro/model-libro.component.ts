import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Libro } from '../../models/libro.model';
import { LibroService } from '../../services/libro.service';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-model-libro',
  templateUrl: './model-libro.component.html',
  styleUrls: ['./model-libro.component.css']
})
export class ModelLibroComponent {

  //Filtro de Grila
  filtro: string ="";

  //Grilla
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns = ["idLibro","titulo",'actions'];
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [5,10];
  dataSource:any;

  constructor(private dialog: MatDialog, private libroService: LibroService) {
    this.refreshTable("todos");
  }

  seleccioneLibro(objLibro: Libro) {
    window.sessionStorage.setItem("LIBRO", JSON.stringify(objLibro));
    this.dialog.closeAll();  
 }

  applyFilter() {
    console.log(">>> applyFilter ");
    this.refreshTable(this.filtro);
  }

onPageChange(any : any){
    console.log(">> length >> " + any.length);
    console.log(">> pageIndex >> " + any.pageIndex);
    console.log(">> pageSize >> " + any.pageSize);
    console.log(">> previousPageIndex >> " + any.previousPageIndex);
    this.refreshTable(this.filtro);
}

private refreshTable(filtro : string) {
    console.log(">>> refreshTable ");
    this.libroService.consultaFiltro(filtro, this.pageIndex, this.pageSize).subscribe(
        x => {
              this.dataSource = new MatTableDataSource(x);
              this.dataSource.paginator = this.paginator;
        }
    );
}

}
