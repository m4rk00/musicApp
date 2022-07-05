
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcercaComponent } from "./pages/acerca/acerca.component";
import { CrearCancionComponent } from "./pages/crear-cancion/crear-cancion.component";
import { EditarCancionComponent } from "./pages/editar-cancion/editar-cancion.component";
import { PlaylistComponent } from "./pages/playlist/playlist.component";

const routes: Routes = [
    {path: '',pathMatch: 'full', redirectTo: 'crear-cancion'},
    {path: 'crear-cancion', component: CrearCancionComponent},
    {path: 'editar-cancion/:id', component: EditarCancionComponent},
    {path: 'playlist', component: PlaylistComponent},
    {path: 'acerca-de', component: AcercaComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule { }