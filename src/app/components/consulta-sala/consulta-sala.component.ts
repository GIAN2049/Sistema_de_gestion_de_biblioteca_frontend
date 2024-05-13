import { Component, OnInit, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { SalaService } from '../../services/sala.service';
import { Sala } from '../../models/sala.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-consulta-sala',
  templateUrl: './consulta-sala.component.html',
  styleUrls: ['./consulta-sala.component.css']
})
export class ConsultaSalaComponent implements OnInit {

  lstTipoSala : DataCatalogo[]=[];
  lstSede : DataCatalogo[]=[];

  //Filtro
  numero : string = "";
  estado : boolean = true;
  tipo : string = "-1"
  sede : string = "-1"

    //Grila
    dataSource:any;
    //clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
    //cabecera
  
    displayedColumns = ["idSala","numero","piso","numAlumnos","recursos","tipo","sede","estado"];

    constructor(private utilService: UtilService, 
                private tokenService: TokenService,
                private salaService: SalaService ){
                  this.utilService.listaTipoSala().subscribe(
                      x=> this.lstTipoSala = x
                  );
                  this.utilService.listaSede().subscribe(
                    x=> this.lstSede = x
                );        
       }
    
       consulta(){
        console.log(">>> refreshTable [ini]");
        console.log(">>> numero >> " + this.numero);
        console.log(">>> estado >> " + this.estado);
        console.log(">>> tipo >> " + this.tipo); 
        console.log(">>> sede >> " + this.sede);

        this.salaService.consultarSalaComplejo(
          this.numero,
          this.estado ? 1 : 0,
          parseInt(this.sede),
          parseInt(this.tipo)
        ).subscribe(
    x => {
      this.dataSource = new MatTableDataSource<Sala>(x);
      this.dataSource.paginator = this.paginator
    }
);

console.log(">>> refreshTable [fin]");

       }

  ngOnInit(): void {
  }

}
