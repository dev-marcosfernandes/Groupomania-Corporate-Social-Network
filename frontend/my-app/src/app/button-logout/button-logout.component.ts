import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-button-logout',
  templateUrl: './button-logout.component.html',
  styleUrls: ['./button-logout.component.css']

})
export class ButtonLogoutComponent implements OnInit {

  @Output() btnClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  onClick() {
    this.btnClick.emit();
  }


}
