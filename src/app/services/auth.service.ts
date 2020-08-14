import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) { }


  initAuthListener(){

    this.auth.authState.subscribe( fuser => {
      console.log(fuser)
      console.log(fuser?.uid)
      console.log(fuser?.email)
    })

  }


  crearUsuario(name: string, email: string, password: string){

    console.log({name, email, password})
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({ user }) => {

          const newUser = new Usuario(user.uid, name, user.email);

         return this.firestore.doc(`${user.uid}/usuario`).set( {...newUser} );

      });

  }

  login( email: string, password: string){

    console.log({email, password})
    
    return this.auth.signInWithEmailAndPassword(email, password);

  }

  logout(){    
   return this.auth.signOut();

  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

}
