import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})


export class AddMatchComponent implements OnInit {

  match :any ={}


  constructor( private router : Router , private matchService:MatchesService ) { }

  ngOnInit(): void {
  }

  addMatch(){
    // let T =JSON.parse( localStorage.getItem('matches') || '[]')  
    // this.match.id = T.length===0 ? 1 : T.at(-1).id + 1
    // T.push(this.match)
    // localStorage.setItem('matches',JSON.stringify(T))
    // this.router.navigate(['/table-matches'])

    this.matchService.addMatch(this.match).subscribe((result)=>{

      console.log(result.message);
      
    })


  }

}



