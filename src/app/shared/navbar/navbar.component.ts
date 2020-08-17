import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  nombre: string = '';
  subsUser: Subscription;

  ngOnInit(): void {

    this.subsUser = this.store.select('user')
    .pipe(
      filter(element => element.user != null)
    )
    .subscribe(({user})=>{
      this.nombre = user.nombre;
    })

  }

  ngOnDestroy(): void {
    this.subsUser.unsubscribe();
    
  }

}
