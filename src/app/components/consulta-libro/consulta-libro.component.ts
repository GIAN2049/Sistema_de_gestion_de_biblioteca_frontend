import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Editorial } from '../../models/Editorial.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-libro',
  templateUrl: './consulta-libro.component.html',
  styleUrls: ['./consulta-libro.component.css']
})
export class ConsultaLibroComponent {

  lstCategoriaLibro : DataCatalogo[] = [];
  lstEditorial : Editorial[] = [];
  lstTipoLibro : DataCatalogo[] = [];

   //Filtro
   titulo : string = "";
      //anio : number = 0;
   serie : string = "";
   estado: boolean = true;
   categoriaLibro : string = "-1";
   editorial : string = "-1";
   tipoLibro: string = "-1"

   //Grila
   dataSource:any;

   //Clase para la paginacion
   @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera
    displayedColumns = ["idLibro", "titulo","anio","serie","categoriaLibro","tipoLibro", "editorial", "estadoPrestamo","estado"];


  constructor(private utilService: UtilService,
              private libroService: LibroService){
        this.utilService.listaCategoriaDeLibro().subscribe(
              x =>  this.lstCategoriaLibro = x
        );
        this.utilService.listaEditorial().subscribe(
          x =>  this.lstEditorial = x
        );
        this.utilService.listaTipoLibroRevista().subscribe(
          x =>  this.lstTipoLibro = x
        );
   }

    //console.log(">>> anio >> " + this.anio);

   consulta(){
    console.log(">>> refreshTable [ini]");
    console.log(">>> titulo >> " + this.titulo);
    console.log(">>> serie >> " + this.serie);
    console.log(">>> estado >> " + this.estado);
    console.log(">>> categoriaLibro >> " + this.categoriaLibro);
    console.log(">>> editorial >> " + this.editorial);
    console.log(">>> tipoLibro >> " + this.tipoLibro);

    ////this.anio,
    this.libroService.consultaLibroComplejo(
                                  this.titulo,
                                  this.serie,
                                  this.estado ? 1 : 0,
                                  parseInt(this.categoriaLibro),
                                  parseInt(this.editorial),
                                  parseInt(this.tipoLibro)
                                ).subscribe(
        x => {
                  this.dataSource = new MatTableDataSource<Libro>(x);
                  this.dataSource.paginator = this.paginator
        }
);

    }
}
