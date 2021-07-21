import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent implements OnInit {
  @Input()
  pizza_name = ''

  @Input()
  price = 0

  constructor() { }

  ngOnInit(): void {
  }

}
