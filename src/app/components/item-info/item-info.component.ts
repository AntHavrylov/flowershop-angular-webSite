import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  
  
  
  searchText:string;
  names:string[] = [
    'first',
    'second',
    'third',
    'fourth'
  ];
  
  constructor() { }

  ngOnInit() {
    
  }

}
