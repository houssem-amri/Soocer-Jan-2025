import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {


  id: any
  team: any = {}
  title = 'Add team'
  image: any
  imagePreview: any
  constructor(private router: Router, private activatedRoute: ActivatedRoute , private teamService : TeamsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('teamId')

    if (this.id) {
      this.title = 'Edit team'
      this.getTeamById()

    }

  }


  addEditTeam() {
    let T = JSON.parse(localStorage.getItem('teams') || '[]')
    if (this.id) {
      // rani fel Edit
      for (let i = 0; i < T.length; i++) {
        if (T[i].id == this.id) {
          T[i] = this.team
          break

        }
      }

    } else {
      // rani fel Add
      // this.team.id = T.length === 0 ? 1 : T.at(-1).id + 1
      // T.push(this.team)

      this.teamService.addTeam(this.team , this.image).subscribe((res)=>{

        console.log(res.message);
        

      })

    }
    localStorage.setItem('teams', JSON.stringify(T))
    // this.router.navigate(['/table-teams'])
  }

  getTeamById() {
    let teams = JSON.parse(localStorage.getItem('teams') || '[]')
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].id == this.id) {
        this.team = teams[i]
        break

      }
    }
  }



  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.image = file
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string      
    };
    reader.readAsDataURL(file);

  }

}
