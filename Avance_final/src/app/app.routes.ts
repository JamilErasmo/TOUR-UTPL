import { RouterModule ,Routes } from "@angular/router";
import { GestionardataComponent } from "./data/gestionardata/gestionardata.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthComponent } from "./login/auth/auth.component";

// Se definen las direntes rutas del programa proyecto
const APP_ROUTES: Routes = [
    { path: 'Login', component: AuthComponent },
    // Se define la directiva canActive de manera que solo puedan acceder los usuarios que se encuentren logueados
    { path: 'GestionarData', component: GestionardataComponent, canActivate: [AuthGuard] },
    // La direcctiva pathMode y redirecto determinan a que sitio se desea navegar en caso de que una página especificáda no exista
    { path: '**', pathMatch: 'full', redirectTo: 'GestionarData'},
    { path: '', pathMatch: 'full', redirectTo: 'Login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});