import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ct-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title : string;

  constructor() { }

  ngOnInit() {
  }

}
