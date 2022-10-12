import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { UserModel } from 'src/app/models/users.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  
  user: UserModel
  constructor(private router:Router, private dataService: DataService) { }

  ejecutar(form: NgForm){
    if(form.invalid){
      return
    }

    if(this.user.username == 'admin' && this.user.password == 'admin'){
      localStorage.setItem('token', 'REGISTRADO');
      this.router.navigate(['/GestionarData'])
    }
  }

  ingresar(){
    this.dataService.login()
  }

  ingresarm(){
    this.dataService.loginm()
  }
  ngOnInit(): void {
    this.user = new UserModel();
  }

}
