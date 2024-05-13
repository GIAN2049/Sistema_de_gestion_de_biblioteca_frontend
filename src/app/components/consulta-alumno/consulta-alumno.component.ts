import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Pais } from '../../models/pais.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { AlumnoService } from '../../services/alumno.service';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from '../../models/alumno.model';
@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],

  
  selector: 'app-consulta-alumno',
  templateUrl: './consulta-alumno.component.html',
  styleUrls: ['./consulta-alumno.component.css']
})
export class ConsultaAlumnoComponent {

  //combobox
  lstPais: Pais[] = [];
  lstModalidad: DataCatalogo[] = [];

  //Filtro
  nombres : string = "";
  apellidos : string = "";
  telefono : string = "";
  celular : string = "";
  dni : string = "";
  correo : string = "";
  tipoSangre : string = "";
  fecDesde : Date = new Date();
  fecHasta : Date =new Date() ;
  estado : boolean = true;
  modalidad : string = "-1"
  pais: string = "-1"

  //Grila
  dataSource:any;
  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
  //Cabecera
  displayedColumns = ["idAlumno","nombres","apellidos","telefono","celular","dni",
  "correo","tipoSangre","fechaNacimiento","pais","modalidad", "estado"];

  constructor(private utilService: UtilService, 
    private tokenService: TokenService,
    private alumnoService: AlumnoService ){

    this.utilService.listaModalidadAlumno().subscribe(
      x =>  this.lstModalidad = x
    );
    this.utilService.listaPais().subscribe(
     x =>  this.lstPais = x
  );

}
consulta(){
  console.log(">>> refreshTable [ini]");
  console.log(">>> nombres >> " + this.nombres);
  console.log(">>> apellidos >> " + this.apellidos);
  console.log(">>> telefono >> " + this.telefono);
  console.log(">>> celular >> " + this.celular);
  console.log(">>> dni >> " + this.dni);
  console.log(">>> correo >> " + this.correo);
  console.log(">>> tipoSangre >> " + this.tipoSangre);
  console.log(">>> fecDesde >> " + this.fecDesde.toISOString());
  console.log(">>> fecHasta >> " + this.fecHasta.toISOString());
  console.log(">>> estado >> " + this.estado);
  console.log(">>> modalidad >> " + this.modalidad);
  console.log(">>> pais >> " + this.pais);

  this.alumnoService.consultarAlumnoComplejo(
              this.nombres,
              this.apellidos,
              this.telefono,
              this.celular,
              this.dni,
              this.correo,
              this.tipoSangre,
              this.fecDesde.toISOString(),
              this.fecHasta.toISOString(),
              this.estado ? 1 : 0,
              parseInt(this.pais),
              parseInt(this.modalidad)
            ).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Alumno>(x);
          this.dataSource.paginator = this.paginator
        }
    );

    console.log(">>> refreshTable [fin]");
  }

  /*
  ngOnInit(): void {
  }
  */

}
