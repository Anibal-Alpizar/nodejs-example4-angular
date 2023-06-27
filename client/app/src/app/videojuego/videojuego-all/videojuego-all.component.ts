import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VideojuegoAllDataSource, VideojuegoAllItem } from './videojuego-all-datasource';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-videojuego-all',
  templateUrl: './videojuego-all.component.html',
  styleUrls: ['./videojuego-all.component.css']
})
export class VideojuegoAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'precio','acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService) {
    
  }

  ngAfterViewInit(): void {
   this.listaVideojuegos();
   
  }
  listaVideojuegos(){
    //localhost:3000/videojuego
    this.gService.list('videojuego/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      });   
  }
  detalle(id:number){
    this.router.navigate(['/videojuego',id],
    {
      relativeTo:this.route
    })
  }
  actualizarVideojuego(id: number) {
    this.router.navigate(['/videojuego/update', id], {
      relativeTo: this.route,
    });
  }

  crearVideojuego() {
    this.router.navigate(['/videojuego/create'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
