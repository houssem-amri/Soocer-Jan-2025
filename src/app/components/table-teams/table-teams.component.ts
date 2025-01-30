import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-teams',
  templateUrl: './table-teams.component.html',
  styleUrls: ['./table-teams.component.css']
})
export class TableTeamsComponent implements OnInit {

  teams:any=[]

  constructor(private router:Router ) { }

  ngOnInit(): void {
    this.getAllTeams()
  }

  getAllTeams(){    
    this.teams= JSON.parse(localStorage.getItem('teams') || '[]')
    
  }


  navigateTo(id:any){
    console.log('here id',id);
    

    this.router.navigate(['/add-team/'+id])
  }

  deleteTeams(id: any) {
    // trait delete Match

    for (let i = 0; i < this.teams.length; i++) {

      if (this.teams[i].id == id) {
        this.teams.splice(i, 1)
        localStorage.setItem('teams', JSON.stringify(this.teams))
        break

      }
    }

  }
}
