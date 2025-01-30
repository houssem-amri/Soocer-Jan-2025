import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user:any={}
  constructor(private userService :UsersService , private router:Router) { }


  ngOnInit(): void {

  }

  login(){
    this.userService.login(this.user).subscribe((res)=>{
      if (res.message ==='2') {        
        localStorage.setItem('connectedUser',JSON.stringify(res.user))
        this.router.navigate(['/'])
        

      }
    })
  }


}
