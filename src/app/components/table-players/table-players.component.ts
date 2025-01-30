import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-table-players',
  templateUrl: './table-players.component.html',
  styleUrls: ['./table-players.component.css']
})
export class TablePlayersComponent implements OnInit {

  players:any=[]
  teams:any=[]
  constructor(private playerService:PlayersService) { }

  ngOnInit(): void {
   
    this.getAllPlayers()
  }

  getAllPlayers(){
    this.playerService.getAllPlayers().subscribe((response)=>{      
      this.players= response.players
    })
  }




}
