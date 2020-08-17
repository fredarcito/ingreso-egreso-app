import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { IngresoEgresoService } from '../services/ingreso-egreso.service'
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userSubs: Subscription;
  ingresosSubs: Subscription;

  constructor(
    private store : Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
    ) { }

  ngOnInit(): void {

      this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) =>{
        console.log(user)
        this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
        .subscribe( (ingresosEgresos:any) => {
          
          this.store.dispatch( setItems({items: ingresosEgresos}) )

        })
      })

  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingresosSubs.unsubscribe();
    
  }

}
