import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  Songs:any = [];

  constructor(private musicService: MusicService) {
    this.getPlaylist();
  }

  ngOnInit(): void {
  }

  //metodo para obtener todos los empleados
  getPlaylist(){
    this.musicService.getPlaylist().subscribe((data) => {
      this.Songs = data;
    })
  }

  //metodo para eliminar un empleado
  eliminarSong(song, index){
    if(window.confirm('Estas seguro que la deseas borrar?')) {
      this.musicService.deleteSong(song._id).subscribe((data) => {
        this.Songs.splice(index,1);
      })
    }
  }

}
