import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcercaComponent } from './pages/acerca/acerca.component';
import { CrearCancionComponent } from './pages/crear-cancion/crear-cancion.component';
import { EditarCancionComponent } from './pages/editar-cancion/editar-cancion.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MusicService } from './services/music.service';

@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    CrearCancionComponent,
    EditarCancionComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
