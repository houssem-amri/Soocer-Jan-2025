import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {


  term:any
  matches:any=[]

  constructor(private mService:MatchesService) { }

  ngOnInit(): void {

    this.getAllMatches()
  }

  getAllMatches(){
    // this.matches= JSON.parse(localStorage.getItem('matches') ||'[]')
    this.mService.soccerApigetAllMatches().subscribe((res)=>{
      console.log('******',res);
      
    })
  }

  parentDeleteMatch(event:any){

    for (let i = 0; i < this.matches.length; i++) {
      if (this.matches[i].id == event) {
        this.matches.splice(i, 1)
        localStorage.setItem('matches', JSON.stringify(this.matches))
        break

      }
    }
  }




}
