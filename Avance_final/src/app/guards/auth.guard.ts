import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public dataService: DataService) {}

  canActivate(): boolean {
    // Cuando se registra un datos se almacena en el navegador hasta que se cierre por completo
    if (sessionStorage.getItem('token')){
      return true
    }else{
      this.router.navigate(['/Login']);
      return false;
    }
  }
  
}
