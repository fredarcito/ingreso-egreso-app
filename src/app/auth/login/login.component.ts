import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email ]],
      password: ['', Validators.required ]
    });

  }

  login(){

    const { correo, password } = this.loginForm.value

    this.authService.login(correo, password)
      .then(credenciales => {

        this.router.navigate(['/']);

        console.log(credenciales)
      }).catch(err => console.log(err));

  }

}
