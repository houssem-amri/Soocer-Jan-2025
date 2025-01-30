import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() match: any = {}
  @Output() newMatches = new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
  }

  deleteMatch() {
    console.log('here into child');

    this.newMatches.emit(this.match.id)

  }

  compare(a: any, b: any) {

    if (a>b) {
      return ['Win' , 'green']
      
    }else if (a<b) {
      return ['Loss' ,'blue']

    }else{
      return ['Draw','yellow']

    }

  }


}
