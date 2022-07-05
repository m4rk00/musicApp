import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/music';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from 'src/app/services/music.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-cancion',
  templateUrl: './editar-cancion.component.html',
  styleUrls: ['./editar-cancion.component.css']
})
export class EditarCancionComponent implements OnInit {
//propiedades
enviado = false;
//empleadoDepartamento: any = ['Administracion','Finanzas','Recursos Humanos','TI','Ventas'];
editarForm: FormGroup;
empleadoData: Song[];

  constructor(
    public formBuilder: FormBuilder,
    private router:Router,
    private musicService: MusicService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getSong(id);
    this.editarForm = this.formBuilder.group({  
      nombre:['',[Validators.required]],
      genero:['',[Validators.required]],
      banda:['',[Validators.required]],
      link:['',[Validators.required]],
      album:['',[Validators.required]],
      lanzamiento:['',[Validators.required]],
      img:['',[Validators.required]],
    });
  }

    mainForm(){

      this.editarForm = this.formBuilder.group({
        nombre:['',[Validators.required]],
        genero:['',[Validators.required]],
        banda:['',[Validators.required]],
        link:['',[Validators.required]],
        album:['',[Validators.required]],
        lanzamiento:['',[Validators.required]],
        img:['',[Validators.required]],
    }
    );
  }

  //getter para acceder a los controles del formulario
  get myForm(){
    return this.editarForm.controls;
  }

  //Buscar al empleado que vamos a modificar
  getSong(id){
    this.musicService.getSong(id).subscribe((data) => {
      this.editarForm.setValue({
        nombre: data['nombre'],
        genero: data['genero'],
        banda: data['banda'],
        link: data['link'],
        album: data['album'],
        lanzamiento: data['lanzamiento'],
        img: data['img']
      });
    });
  }

  //metodo que se ejecuta cuando se envia el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.editarForm.valid){
      return false;
    }else{
      if(window.confirm('Estas seguro de que lo deseas modificar?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.musicService.updateSong(id,this.editarForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/playlist');
            console.log('Se actualizo correctamente');
          },
          error:(e) => {
            console.log(e);
          },
        });
      }
    }
  }

}
