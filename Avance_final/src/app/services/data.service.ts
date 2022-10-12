import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCrudModel } from '../models/data.model';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { addDoc, Firestore, collectionData, doc, deleteDoc, updateDoc } from "@angular/fire/firestore";
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { getAuth, linkWithPopup, OAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
// Clase que define la comunicación entre la app y la base de datos
export class DataService {

  // Url de conexión hacia la base de datos firebase
  private url = "https://recorrido-utpl-default-rtdb.firebaseio.com";
  public user: any = {};

  constructor(private http: HttpClient, public auth: AngularFireAuth, private router:Router, private firestore: Firestore) { 
    // Parámetro que determina si se ha variado los datos de autenticación cambia cuando hay conexión con google
    this.auth.authState.subscribe( us => {
      if( !us ){
        return
      }
      // Parámetros globales que se los puede utilizar en cualquier parte del programa
      this.user.nombre = us.displayName;
      // El UID se genera cada vez que el usuario se loguee en la app
      this.user.uid = us.uid;
    })
  }

  // Metodo para realizar la inserción de un dato en firebase

  crearData(data: DataCrudModel){
    const dataRef = collection(this.firestore, 'proyecto');
    const resp =  addDoc(dataRef, data)
    return resp;
  }

  // Se actualiza mediante la función updateDoc los datos almacenados en firebase para esto se toma en consideración el ID
  async actualizarData(data: any){
    const dataRef = doc(this.firestore, `proyecto/${data.id}`);
    await updateDoc(dataRef, data).then( () => {
      return true
    })
    .catch( () => {
      return false;
    })
  }

  // Se obtiene los datos almacenados en firebase

  obtenerData(): Observable<DataCrudModel[]>{
    const dataRef = collection(this.firestore, 'proyecto');
    return collectionData(dataRef, {idField: 'id'}) as Observable<DataCrudModel[]>
  }


  // Método para eliminar un registro utilizando el id como identificador
  deleteData(data: DataCrudModel){
    const dataRef = doc(this.firestore, `proyecto/${data.id}`);
    return deleteDoc(dataRef)
  }

  // Método para registrar el acceso utilizando GOOGLE
  async login() {
    // Los método aquí definidos corresponden al @angular/fire
    await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    await sessionStorage.setItem('token', this.user.uid);
    this.router.navigate(['/GestionarData'])
  }
  async loginm() {
    let provider = new firebase.auth.OAuthProvider('microsoft.com');
    await firebase.auth().signInWithPopup(provider).then( data => {
      sessionStorage.setItem('token', this.user.uid);
      this.router.navigate(['/GestionarData'])
    })
  }
  // Método para salir del sistema
  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/Login'])
  }
}
