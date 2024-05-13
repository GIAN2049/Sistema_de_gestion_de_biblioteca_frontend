import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { TesisService } from '../../services/tesis.service';
import { MatTableDataSource } from '@angular/material/table';
import { Tesis } from '../../models/tesis.model';
@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-tesis',
  templateUrl: './consulta-tesis.component.html',
  styleUrls: ['./consulta-tesis.component.css']
})
export class ConsultaTesisComponent{

  lstTema: DataCatalogo[] = [];
  lstIdioma: DataCatalogo[] = [];
  lstCentroEstudios: DataCatalogo[] = [];

  //Filtro
  titulo: string = "";
  fecDesde: Date = new Date();
  fecHasta: Date = new Date();
  estado: boolean = true;
  tema: string = "-1"
  idioma: string = "-1"
  centroEstudio: string = "-1"

  //Grila
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //Cabecera
  displayedColumns = ["idTesis", "titulo", "fechaCreacion", "tema", "idioma", "centroEstudio", "estado"];

  constructor(private utilService: UtilService,
    private tokenService: TokenService,
    private tesisService: TesisService) {
    this.utilService.listaTema().subscribe(
      x => this.lstTema = x
    );
    this.utilService.listaIdioma().subscribe(
      x => this.lstIdioma = x
    );
    this.utilService.listaCentroEstudios().subscribe(
      x => this.lstCentroEstudios = x
    );
  }

  consulta() {
    console.log(">>> refreshTable [ini]");
    console.log(">>> TITULO >> " + this.titulo);
    console.log(">>> fecDesde >> " + this.fecDesde.toISOString());
    console.log(">>> fecHasta >> " + this.fecHasta.toISOString());
    console.log(">>> estado >> " + this.estado);
    console.log(">>> Tema >> " + this.tema);
    console.log(">>> Idioma >> " + this.idioma);
    console.log(">>> Centro Estudios >> " + this.centroEstudio);

    this.tesisService.consultarTesisComplejo(
      this.titulo,
      this.fecDesde.toISOString(),
      this.fecHasta.toISOString(),
      this.estado ? 1 : 0,
      parseInt(this.tema),
      parseInt(this.idioma),
      parseInt(this.centroEstudio)
    ).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Tesis>(x);
        this.dataSource.paginator = this.paginator
      }
    );

    console.log(">>> refreshTable [fin]");
  }
  /*
  ngOnInit(): void {
  }*/

}

