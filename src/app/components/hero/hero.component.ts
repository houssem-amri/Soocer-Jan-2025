import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  title=""
  weatherIcon=""

  currentDate = Date.now()
  user = {
    id:4,
    name:'muhamed'
  }

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    this.userService.getDataWeather().subscribe((res:any)=>{
      console.log(res.data);
      this.title=res.data.main.temp +' °C' 
      this.weatherIcon= `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@4x.png` 
    })

    // setInterval(()=>{
    //   this.currentDate = Date.now()

    // },1000)
    
    // setTimeout(()=>{
    //   console.log('hereeeeeeeeeeeee');
      
    // },3000)


  }

}
