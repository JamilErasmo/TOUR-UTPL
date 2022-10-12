import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Parámetros para los diferentes objetos visuales que ocupa angular
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {FileUploadModule} from 'primeng/fileupload';
import {ImageModule} from 'primeng/image';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';

// Se definen los parametros de conexión, carga y descarga de información desde firebase
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// Se importa el archivo donde se encuentran localizadas las diferentes rutas
import { APP_ROUTING } from "./app.routes";

import { AppComponent } from './app.component';
import { AuthComponent } from './login/auth/auth.component';
import { GestionardataComponent } from './data/gestionardata/gestionardata.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// Se carga la información definida en el enviroment
import { environment } from '../environments/environment';
// Parámetros para la autenticación desde Google
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GestionardataComponent
  ],
  imports: [
    APP_ROUTING,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    DividerModule,
    FileUploadModule,
    ImageModule,
    InputTextareaModule,
    ToastModule,
    ReactiveFormsModule,
    // Parámetros de inicialización del firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
