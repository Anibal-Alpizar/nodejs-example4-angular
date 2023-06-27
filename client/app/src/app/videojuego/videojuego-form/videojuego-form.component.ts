import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-videojuego-form',
  templateUrl: './videojuego-form.component.html',
  styleUrls: ['./videojuego-form.component.css'],
})
export class VideojuegoFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de generos
  generosList: any;
  //Videojuego a actualizar
  videojuegoInfo: any;
  //Respuesta del API crear/modificar
  respVideojuego: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  videojuegoForm: FormGroup;
  //id del Videojuego
  idVideojuego: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaGeneros();
  }
  ngOnInit(): void {}
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.videojuegoForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      publicar: [true, Validators.required],
      generos: [null, Validators.required],
    });
  }
  listaGeneros() {
    this.generosList = null;
    this.gService
      .list('genero')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.generosList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.videojuegoForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearVideojuego(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.videojuegoForm.invalid) {
      return;
    }

    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat: any = this.videojuegoForm
      .get('generos')
      .value.map((x) => ({ ['id']: x }));

    //Asignar valor al formulario
    this.videojuegoForm.patchValue({ generos: gFormat });
    console.log(this.videojuegoForm.value);
    
    //Accion API create enviando toda la informacion del formulario
      this.gService.create('videojuego',this.videojuegoForm.value)
      .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
        //Obtener respuesta
        this.respVideojuego=data;
        this.router.navigate(['/videojuego/all'],{
          queryParams: {update:'true'}
        });
      }); 

  }
  //Actualizar Videojuego
  actualizarVideojuego() {
   //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.videojuegoForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.videojuegoForm.get('generos').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.videojuegoForm.patchValue({ generos:gFormat});
    console.log(this.videojuegoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('videojuego',this.videojuegoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respVideojuego=data;
      this.router.navigate(['/videojuego/all'],{
        queryParams: {update:'true'}
      });
    }); 
  }
  onReset() {}
  onBack() {
    this.router.navigate(['/videojuego/all']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
