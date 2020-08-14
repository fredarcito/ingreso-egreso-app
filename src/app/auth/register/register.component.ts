import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.email ]],
      password: ['', Validators.required ]
    });

  }

  crearUsuario(){

    const { nombre, correo, password } = this.registroForm.value

    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {

        this.router.navigate(['/']);

        console.log(credenciales)
      }).catch(err => {
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,

        })
      });

  }

}
