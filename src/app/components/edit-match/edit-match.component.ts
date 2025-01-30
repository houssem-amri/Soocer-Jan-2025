import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})

export class EditMatchComponent implements OnInit {

  match: any = {}
  id: any
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private mService: MatchesService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.getMatchById()
  }

  getMatchById() {
    this.mService.getMatchById(this.id).subscribe((res) => {
      this.match = res.match
    })

  }

  editMatch() {
    this.mService.updateMatch(this.match).subscribe((res) => {
      console.log(res.message);
      this.router.navigate(['/table-matches'])
    })
  }

}
