import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { MustMatch } from 'src/app/shared/Cpwd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm !: FormGroup


  constructor(private formBuilder: FormBuilder,
     private userService: UsersService,
      private router: Router,
       private toastr: ToastrService) { }

  ngOnInit(): void {



    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      password: [''],
      cPassword: [''],
    }, {
      validators: MustMatch('password', 'cPassword')
    })
  }



  signup() {
    console.log(this.signupForm);

    this.signupForm.value.role = window.location.pathname ==='/signupAdmin' ?'admin' :'user'

    this.userService.inscription(this.signupForm.value).subscribe((res) => {
      console.log(res.message);
      if (res.message === '1') {

        this.toastr.error('Signup', 'Email Existe');

      } else if (res.message === '0') {

        // this.router.navigate(['/'])
      }

    })


  }
}
