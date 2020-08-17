import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model'
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }


  crearIngreso(ingresoEgreso: IngresoEgreso){

    const uid  = this.authService.user.uid
    console.log(ingresoEgreso)

    return this.firestore.doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso})
  }

  initIngresosEgresosListener(uid: string){

    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot => {
        return snapshot.map(doc => {
          
          const data:{} = doc.payload.doc.data()

          return { 
            uid: doc.payload.doc.id,
            ...data
           }
        })
      })
    )
  }

  borrarIngresoEgreso(uidItem: string){
    const uid  = this.authService.user.uid;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }

}
