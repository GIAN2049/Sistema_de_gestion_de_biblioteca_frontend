import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component'
import { AppMaterialModule } from '../../app.material.module';
import { Sala } from '../../models/sala.model';
import { Alumno } from '../../models/alumno.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservaSalaService } from '../../services/reservaSala.Service';
import { TokenService } from '../../security/token.service';
import { Usuario } from '../../models/usuario.model';
import { ModelAlumnoComponent } from '../model-alumno/model-alumno.component';
import { ModelSalaComponent } from '../model-sala/model-sala.component';
import { ReservaSala } from '../../models/ReservaSala.model';
import Swal from 'sweetalert2';
import { UtilService } from '../../services/util.service';

@Component({
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  selector: 'app-transaccion-reserva-sala',
  templateUrl: './transaccion-reserva-sala.component.html',
  styleUrls: ['./transaccion-reserva-sala.component.css'],
})
export class TransaccionReservaSalaComponent {
  
  objAlumno : Alumno = {};
  objSala : Sala = {};

  objUsuario: Usuario = {};

  constructor(
    private dialogService: MatDialog,
    private rsalaService: ReservaSalaService,
    private tokenService: TokenService,
    private utilService: UtilService
  ) {
    this.objUsuario.idUsuario = tokenService.getUserId();
    
  }

  buscaAlumno() {
    console.log('>>> buscaAlumno ');
    const dialog = this.dialogService.open(ModelAlumnoComponent);
    dialog.afterClosed().subscribe(() => this.cargaAlumno());
  }

  cargaAlumno() {
    var str = window.sessionStorage.getItem('ALUMNO') || '{}';
    this.objAlumno = JSON.parse(str);
  }

  buscaSala() {
    console.log('>>> buscaLibro ');
    const dialog = this.dialogService.open(ModelSalaComponent);
    dialog.afterClosed().subscribe(() => this.cargaSala());
  }

  cargaSala() {
    var str = window.sessionStorage.getItem('SALA') || '{}';
    this.objSala = JSON.parse(str);
  }

  formatDate(date: Date): string {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return hours + ':' + minutes + ':' + seconds;
  }

  objReservaSala: ReservaSala = {
    horaInicio: undefined,
    horaFin: undefined,
    alumno: {
      idAlumno: -1,
    },
    sala: {
      idSala: -1,
    },
  };

  
  registrarReserva() {
    this.objReservaSala.usuarioRegistro = this.objUsuario;
    this.objReservaSala.alumno!.idAlumno = this.objAlumno.idAlumno;
    this.objReservaSala.sala!.idSala = this.objSala.idSala;

    console.log(">>> idAlumno: " +  this.objAlumno.idAlumno)
    console.log(">>> idSala: " +  this.objSala.idSala)
    console.log(">>> horaInicio: " +  this.objReservaSala.horaInicio)
    console.log(">>> horaFin: " +  this.objReservaSala.horaFin)

    this.rsalaService.registrarReserva(this.objReservaSala).subscribe((x) => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: x.mensaje,
      });
    });
  }

  ngOnInit(): void {}
}
