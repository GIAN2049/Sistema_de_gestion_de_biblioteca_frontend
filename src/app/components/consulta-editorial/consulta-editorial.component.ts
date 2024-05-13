import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { UtilService } from '../../services/util.service';
import { EditorialService } from '../../services/editorial.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Editorial } from '../../models/Editorial.model';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-editorial',
  templateUrl: './consulta-editorial.component.html',
  styleUrls: ['./consulta-editorial.component.css'],
})
export class ConsultaEditorialComponent {
  lstPais: Pais[] = [];

  //Filtro
  razonSocial: string = '';
  direccion: string = '';
  ruc: string = '';
  gerente: string = '';
  fecDesde: Date = new Date();
  fecHasta: Date = new Date();
  estado: boolean = true;
  pais: string = '-1';

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
  ];

  constructor(
    private utilService: UtilService,
    private editorialService: EditorialService
  ) {
    this.utilService.listaPais().subscribe((x) => (this.lstPais = x));
  }

  consulta() {
    console.log(">>> refreshTable [ini]");
    console.log(">>> razonSocial >> " + this.razonSocial);
    console.log(">>> direccion >> " + this.direccion);
    console.log(">>> ruc >> " + this.ruc);
    console.log(">>> gerente >> " + this.gerente);
    console.log(">>> fecDesde >> " + this.fecDesde.toISOString());
    console.log(">>> fecHasta >> " + this.fecHasta.toISOString());
    console.log(">>> estado >> " + this.estado);
    console.log(">>> pais >> " + this.pais);

    this.editorialService.consultarRevistaComplejo(
      this.razonSocial,
      this.direccion,
      this.ruc,
      this.gerente,
      this.fecDesde.toISOString(),
      this.fecHasta.toISOString(),
      this.estado ? 1 : 0,
      parseInt(this.pais)
    ).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<Editorial>(x);
        this.dataSource.paginator = this.paginator
      }
    );
  }
}
