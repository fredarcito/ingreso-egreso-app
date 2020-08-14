import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  uiSuscription: Subscription;
  loading =  false;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.email ]],
      password: ['', Validators.required ]
    });

    this.uiSuscription = this.store.select('ui').subscribe(ui => this.loading =  ui.isLoading);

  }


  ngOnDestroy(): void {

    this.uiSuscription.unsubscribe();

}

  crearUsuario(){

    const { nombre, correo, password } = this.registroForm.value;

    this.store.dispatch( ui.isLoading() )


    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {

        this.store.dispatch( ui.stopLoading() )

        this.router.navigate(['/']);

        console.log(credenciales)
      }).catch(err => {

        this.store.dispatch( ui.stopLoading() )
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,

        })
      });

  }

}
