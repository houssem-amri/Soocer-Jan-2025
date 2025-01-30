import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { jwtDecode , JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router:Router){}

  canActivate (route: ActivatedRouteSnapshot) :boolean{
    let token = localStorage.getItem('connectedUser')
    
    if (token) {
      // 3andi user connecté
      let decoded = jwtDecode<CustomJwtPayload>(token);

      let userRole = decoded?.user?.role
      let requiredRole = route.data['role'];
      
      if (requiredRole?.includes(userRole) ) {        
        return true;  
      } else {
        this.router.navigate(['/']);
        return false
      }

    } else {
      // ma3andich user connecté
      this.router.navigate(['/login'])
      return false;

    }
  }

  // canActivate(route: ActivatedRouteSnapshot): boolean {
  //   const userRole = getUserRole();
  //   const requiredRole = route.data['role']; // Récupère le rôle depuis la
  //   configuration des routes
  //   if (userRole === requiredRole) {
  //   return true;
  //   } else {
  //   this.router.navigate(['/unauthorized']); // Rediriger en cas de rôle
  //   non autorisé
  //   return false;
  //   }
  //   }
  
}
