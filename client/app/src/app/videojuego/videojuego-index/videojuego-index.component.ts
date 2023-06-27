import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { VideojuegoDiagComponent } from '../videojuego-diag/videojuego-diag.component';

@Component({
  selector: 'app-videojuego-index',
  templateUrl: './videojuego-index.component.html',
  styleUrls: ['./videojuego-index.component.css']
})
export class VideojuegoIndexComponent {
  datos:any;//Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();

  constructor(private gService:GenericService,
    private dialog:MatDialog
    ){
    this.listaVideojuegos(); 
  }
  //Listar los videojuegos llamando al API
  listaVideojuegos(){
    //localhost:3000/videojuego
    this.gService.list('videojuego/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
      });
    
  }
  detalleVideojuego(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(VideojuegoDiagComponent,dialogConfig);
  }
}
