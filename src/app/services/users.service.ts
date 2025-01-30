import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }



  inscription(user: any) {
    
    return this.http.post<{ message: any }>(this.userUrl + '/signup', user)

  }

  login(user:any) {
    
    return this.http.post<{ message: any , user:any }>(this.userUrl + '/login', user)

  }

  getDataWeather(){
    return this.http.get<{data:any}>('http://localhost:3000/weather_api')
  }

}
