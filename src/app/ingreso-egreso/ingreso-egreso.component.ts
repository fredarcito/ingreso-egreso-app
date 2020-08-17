import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service'
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  subscriptionLoading: Subscription;
  sendData:boolean = false;

  constructor(
    private fb: FormBuilder, 
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })

    this.subscriptionLoading = this.store.select('ui').subscribe((state)=>{
      console.log(state);
      this.sendData = state.isLoading;
    });

  }

  ngOnDestroy(){
    this.subscriptionLoading.unsubscribe();
  }

  guardar(){
    
    this.store.dispatch( uiActions.isLoading() )

   

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngreso(ingresoEgreso).then(res => {

      this.store.dispatch( uiActions.stopLoading () )

      Swal.fire('Registro creado!', descripcion, 'success');
      
        this.ingresoForm.reset();
      })
      .catch(err => {
        this.store.dispatch( uiActions.stopLoading () )
        console.log(err)
      });

  }

}
