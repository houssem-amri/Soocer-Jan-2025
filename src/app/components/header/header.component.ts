import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode , JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    tel: string;
    createdAt: string;
    updatedAt: string;
  };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  connectedUser: any
  constructor(private router: Router) { }

  ngOnInit(): void {

    
  }

  isLogged() {
    let token = localStorage.getItem('connectedUser')

    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);

      if (decoded.iat && decoded.exp && decoded.user) {
        // Conversion de 'iat' et 'exp' en date lisible
        // const iatDate = new Date(decoded.iat * 1000).toISOString();
        // const expDate = new Date(decoded.exp * 1000).toISOString();

        // console.log('Date iat (émis) :', iatDate);
        // console.log('Date exp (expiration) :', expDate);
        this.connectedUser = decoded.user
        
      }





    }

    return !!token
  }

  logout() {
    localStorage.removeItem('connectedUser')
    this.router.navigate(['/'])


  }

}
