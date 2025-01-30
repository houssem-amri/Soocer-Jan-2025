import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {



  count: number = 0
  path: string = 'https://www.grapheine.com/wp-content/uploads/2015/09/nouveau-logo-google-2015.jpg'

disabled :boolean =true
  constructor() { }

  ngOnInit(): void {



  }


  setCount(params:any) {

    this.count=this.count +1

  }




}
