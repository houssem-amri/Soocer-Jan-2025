import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/services/players.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {


  player:any={}

  teams:any=[]

  constructor( private router : Router , private teamsService : TeamsService  , private playerService:PlayersService) { }

  ngOnInit(): void {
    this.getAllTeams()
  }


  getAllTeams(){

    this.teamsService.getAllTeams().subscribe((result)=>{
      this.teams = result.teams
    })

    // this.teams= JSON.parse(localStorage.getItem('teams') || '[]')
  }

  addPlayer(){
    // let T =JSON.parse( localStorage.getItem('players') || '[]')  
    // this.player.id = T.length===0 ? 1 : T.at(-1).id + 1
    // T.push(this.player)
    // localStorage.setItem('players',JSON.stringify(T))
    // this.router.navigate(['/table-players'])

    this.playerService.addPlayer(this.player).subscribe((res)=>{
      this.router.navigate(['/table-players'])
      
    })

  }
}
