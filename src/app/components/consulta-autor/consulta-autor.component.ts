import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { AutorService } from '../../services/autor.service';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatTableDataSource } from '@angular/material/table';
import { Autor } from '../../models/autor.model';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-autor',
  templateUrl: './consulta-autor.component.html',
  styleUrls: ['./consulta-autor.component.css']
})
export class ConsultaAutorComponent{

  lstPais: Pais[] = [];
  lstGradoAutor: DataCatalogo[]=[];

  nombres : string = "";
  apellidos : string = "";
  fecDesde : Date = new Date();
  fecHasta : Date =new Date() ;
  orcid : string="";
  estado : boolean = true;
  grado : string = "-1"
  pais:string="-1"

  //Grila
  dataSource:any;

  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idAutor","nombres","apellidos","fechaNacimiento","telefono","celular","orcid","pais","grado","estado"];


  constructor(private utilService: UtilService, 
              private autorService: AutorService){
                this.utilService.listaPais().subscribe(
                  x =>  this.lstPais = x
           );     
           this.utilService.listaGradoAutor().subscribe(
                  x =>  this.lstGradoAutor =x
           )
   }


consulta(){
  
  console.log(">>> refreshTable [ini]");
  console.log(">>> nombres >> " + this.nombres);
  console.log(">>> apellidos >> " + this.apellidos);
  console.log(">>> fecDesde >> " + this.fecDesde.toISOString());
  console.log(">>> fecHasta >> " + this.fecHasta.toISOString());
  console.log(">>> estado >> " + this.estado);
  console.log(">>> orcid>> " + this.orcid);
  console.log(">>> grado >> " + this.grado);
  console.log(">>> pais >> " + this.pais);

  this.autorService.consultarAutorComplejo(
                                this.nombres,
                                this.apellidos,
                                this.fecDesde.toISOString(),
                                this.fecHasta.toISOString(),
                                this.estado ? 1 : 0,
                                this.orcid,
                                parseInt(this.pais),
                                parseInt(this.grado)
                              ).subscribe(
      x => {
                this.dataSource = new MatTableDataSource<Autor>(x);
                this.dataSource.paginator = this.paginator
      }
);
  }
  }


