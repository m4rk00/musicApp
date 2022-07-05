import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-crear-cancion',
  templateUrl: './crear-cancion.component.html',
  styleUrls: ['./crear-cancion.component.css']
})
export class CrearCancionComponent implements OnInit {

  //propiedades
  songForm: FormGroup;
  enviado = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private musicService: MusicService
  
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm(){

          this.songForm = this.formBuilder.group({
            nombre:['',[Validators.required]],
            genero:['',[Validators.required]],
            banda:['',[Validators.required]],
            link:['',[Validators.required]],
      }
    );
  }

  //getter para acceder a los controles del formulario
  get myForm(){
    return this.songForm.controls;
  }

  //metodo que se ejecuta cuando el usuario envia el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.songForm.valid){
      return false;
    }else{
      return this.musicService.newSong(this.songForm.value).subscribe({
        complete: () => {
          console.log('Empleado agregado correctamente'),
          this.ngZone.run(() => this.router.navigateByUrl('/playlist'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

}

