import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';


const OPCIONES_ALUMNO = 'Opciones'; 

@Component({
    standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
    selector: 'app-model-alumno',
    templateUrl: './model-alumno.component.html',
    styleUrls:['./model-alumno.component.css']
})
export class ModelAlumnoComponent{
     //Filtro de Grila
  filtro: string ="";

  //Grilla
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns = ["idAlumno","nombres","apellidos",'actions'];
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [5,10];
  dataSource:any;

  constructor(private dialog: MatDialog, private alumnoService: AlumnoService) {
    this.refreshTable("todos");
  }

  seleccioneAlumno(objAlumno: Alumno) {
        window.sessionStorage.setItem("ALUMNO", JSON.stringify(objAlumno));
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
      this.alumnoService.consultarFiltro(filtro, this.pageIndex, this.pageSize).subscribe(
          x => {
                this.dataSource = new MatTableDataSource(x);
                this.dataSource.paginator = this.paginator;
          }

      );
  }
}